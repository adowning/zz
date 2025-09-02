/**
 * Character Level Service
 * Handles XP calculations and character level progression for casino games
 */

// Utility functions to replace lodash
const arrayDifference = <T>(array1: T[], array2: T[]): T[] => {
  return array1.filter(item => !array2.includes(item))
}

const arrayAll = <T>(array: T[], predicate: (item: T) => boolean): boolean => {
  return array.every(predicate)
}

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}


interface XPFormula {
  xpPerCharacterLevel: number
  xpPerChipBet: number
  maxXPPerBet: number
  maxBetSizeConsidered: number
  extraXPPerBet: number
  persistent: number
  boosterMult: number
}

interface AvatarVC {
  _currentLevel: number
  _xpProgress: number
  _xpToLevel: number
  updateExperience(data: { level: number; progress: number }, isPartial: boolean): void
}

interface ExperienceUpdateFunction {
  (): void
  isPartialUpdate?: boolean
}

/**
 * Modern Character Level Service class
 * Handles XP calculations and character level progression
 */
export class CharacterLevelService {
  // private static readonly TAG = "XP_SRVC"
  // private static readonly LOGGING_ENABLED = true

  // Default XP formula - this will get overridden by current information from the server after spinning
  private static slotsXpPerSpinFormula: XPFormula = {
    xpPerCharacterLevel: 0.3,
    xpPerChipBet: 5000,
    maxXPPerBet: 37,
    maxBetSizeConsidered: 250000,
    extraXPPerBet: 6,
    persistent: 1,
    boosterMult: 1
  }

  private static readonly knownXPFormulaParameters = Object.keys(CharacterLevelService.slotsXpPerSpinFormula) as (keyof XPFormula)[]

  /**
   * Updates the slots XP formula with new values from the server
   */
  static updateSlotsXPFormula(newXPFormula: Partial<XPFormula>): void {
    if (newXPFormula) {
      this.slotsXpPerSpinFormula = { ...this.slotsXpPerSpinFormula, ...newXPFormula }
    }
  }

  /**
   * Validates that the XP formula contains all required parameters with correct types
   */
  static isXPFormulaValid(formula: XPFormula = this.slotsXpPerSpinFormula): boolean {
    const unexpectedParameters = arrayDifference(Object.keys(formula), this.knownXPFormulaParameters)

    if (unexpectedParameters.length > 0) {
      console.log("Unexpected xp formula, unknown parameters: " + JSON.stringify(unexpectedParameters))
      return false
    }

    // Verify existence and numeric value of expected XP formula parameters
    const allParametersValid = arrayAll(this.knownXPFormulaParameters, (param) => {
      const value = formula[param]
      return isNumber(value)
    })

    if (!allParametersValid) {
      console.log("Unexpected xp formula, invalid parameters. XP Formula: " + JSON.stringify(formula) + "; Required keys: " + JSON.stringify(this.knownXPFormulaParameters))
      return false
    }

    return true
  }

  /**
   * Calculates XP earned from a slot spin
   * WARNING: Any change to logic here needs to be reflected on the server. See character_level_service.php
   * JavaScript rounds .5 up by default as does PHP
   */
  static calculateSlotSpinXP(totalBet: number, currentLevel: number, xpFormula: XPFormula = this.slotsXpPerSpinFormula): number {
    if (!this.isXPFormulaValid(xpFormula)) {
      throw new Error('Invalid XP formula provided')
    }

    const adjustedBetSize = Math.min(totalBet, xpFormula.maxBetSizeConsidered)
    const totalBetContribution = adjustedBetSize / xpFormula.xpPerChipBet
    const levelContribution = xpFormula.xpPerCharacterLevel * currentLevel

    let xp = Math.round(totalBetContribution + levelContribution)
    xp = xp + xpFormula.extraXPPerBet

    xp = Math.min(xp, xpFormula.maxXPPerBet) // cap the total xp

    const xpMult = xpFormula.persistent * xpFormula.boosterMult

    return xpMult * xp
  }

  /**
   * Creates a best guess at an experience update that will trigger from the server but hasn't happened yet
   * Used to update the avatar experience bar unless the server request returns before estimatedUpdate has been used
   */
  static createAvatarExperienceUpdateEstimate(
    avatarVC: AvatarVC,
    totalBet: number
  ): ExperienceUpdateFunction | false {
    let estimatedUpdate: ExperienceUpdateFunction | false = false

    if (this.isXPFormulaValid()) {
      const xpFutureCredit = this.calculateSlotSpinXP(totalBet, avatarVC._currentLevel, this.slotsXpPerSpinFormula)

      if (isNumber(avatarVC._xpProgress) && isNumber(avatarVC._xpToLevel)) {
        const data = {
          level: avatarVC._currentLevel,
          progress: 0
        }

        estimatedUpdate = function() {
          avatarVC.updateExperience(data, true)
        }

        let newProgress = (avatarVC._xpProgress + xpFutureCredit) / avatarVC._xpToLevel

        // Don't actually trigger a level up, go almost all the way and wait for a full update
        if (newProgress >= 1) {
          newProgress = 0.9999
          estimatedUpdate.isPartialUpdate = true
        }

        data.progress = newProgress
      } else {
        console.log("Avatar is missing information to calculate xp update")
      }
    } else {
      console.log("Missing or unexpected xp formula format. Check character_level_service to make sure the data format hasn't changed")
    }

    return estimatedUpdate
  }
}