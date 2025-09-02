// Import SAModel and necessary types from SAModel.ts
// Adjust the path './SAModel' as per your file structure.
// import { SALog } from './SALog'
// import { SALog } from './SALog'
import {
  SAModel,
  DefaultsDefinition,
  DefaultPropertyDescriptor,
  SetterHookOptions,
} from './SAModel'

// SALog.init()
// Assuming 'SALog', 'sprintf', 'CasinoCharacterService', and '_' (lodash)
// are globally available or imported.
// You'll need to ensure type definitions for these exist.

// --- Placeholder Declarations (primarily for global/external dependencies) ---

declare function sprintf(format: string, ...args: any[]): string

// This should be a more specific interface or class based on your actual CasinoCharacterService
declare let CasinoCharacterService: {
  buildAvatarObject: (avatarURL: string | undefined) => Promise<any>
}
// --- End Placeholder Declarations ---

// const TAG = 'CasinoCharacterModel'
// const LOGGING_ENABLED = false
const log = console.log //SALog.createLogFunctions(TAG, LOGGING_ENABLED)

const COMBO_ID_PART_NAMES: readonly [string, string, string] = Object.freeze([
  'characterID',
  'privateID',
  'sessionID',
])

const AVATAR_TYPES: readonly [string, string, string] = Object.freeze([
  'avatarNeutral',
  'avatarPos',
  'avatarNeg',
])

// Custom utility functions to replace lodash
function transform<T, TResult>(
  collection: readonly T[],
  iteratee: (accumulator: TResult, value: T, index: number, array: readonly T[]) => void,
  accumulator: TResult
): TResult {
  collection.forEach((value, index, array) => {
    iteratee(accumulator, value, index, array)
  })
  return accumulator
}

function pick<T extends Record<string, any>>(
  object: T,
  ...keys: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {}
  keys.forEach(key => {
    if (key in object) {
      result[key] = object[key]
    }
  })
  return result
}

function forEach(
  collection: any[] | Record<string, any>,
  iteratee: (value: any, key: any, collection: any) => void
): void {
  if (Array.isArray(collection)) {
    collection.forEach((value, index) => {
      iteratee(value, index, collection)
    })
  } else {
    Object.keys(collection).forEach(key => {
      iteratee(collection[key], key, collection)
    })
  }
}

interface ParsedComboID {
  characterID?: string
  privateID?: string
  sessionID?: string
  [key: string]: string | undefined
}

function parseComboID(
  comboID: string | null | undefined,
): ParsedComboID | null {
  let split: string[] | null = null
  if (comboID) {
    split = comboID.split('.')
  }

  if (split && split.length === COMBO_ID_PART_NAMES.length) {
    return transform(
      COMBO_ID_PART_NAMES,
      (parsed: ParsedComboID, key: string, idx: number) => {
        parsed[key] = split![idx]
      },
      {} as ParsedComboID,
    )
  } else {
    const msg = sprintf(
      'comboID %s could not be parsed',
      JSON.stringify(comboID),
    )
    log(msg)
    return null
  }
}

// Interface for the avatar button delegate (can be refined)
interface AvatarButtonDelegate {
  handleAvatarButtonPress: () => void
  // Add other methods or properties if the delegate has them
}

export interface ICasinoCharacterData {
  balance: number
  characterID: string
  chips: number
  comboID: string
  gold: number
  handle: string
  xpLevel: number
  minigameTickets: number
  privateID: string
  sessionID: string
  totalCash: number
  vipPoints: number
  vipTier: number
  vipProgress: number
  vipPointsToNextTier: number
  purchaseMultiplier: number
  remoteLoggingEnabled: boolean
  fetchTime: number
  lastRateTime: number
  rateTimeLeft?: number
  friendRequestSent: boolean
  online: boolean
  createdOn: number
  b2c: number
  avatarURLs?: { [key: string]: string } // Input for the setter hook
  avatarNeutral?: any // Output of buildAvatarObject, set by the hook
  avatarPos?: any
  avatarNeg?: any
  avatarButtonDelegate?: AvatarButtonDelegate | any // <-- ADDED: For avatar button interactions
}

export class CasinoCharacterModel extends SAModel<ICasinoCharacterData> {
  defaults: DefaultsDefinition = {
    balance: { type: 'int', value: 0 },
    characterID: { type: 'string', value: null },
    chips: { type: 'int', value: 0 },
    comboID: { type: 'string', value: null },
    gold: { type: 'int', value: 0 },
    handle: { type: 'string', value: '' },
    xpLevel: { type: 'int', value: 1 },
    minigameTickets: { type: 'int', value: 0 },
    privateID: { type: 'string', value: null },
    sessionID: { type: 'string', value: null },
    totalCash: { type: 'int', value: 0 },
    vipPoints: { type: 'int', value: 0 },
    vipTier: { type: 'int', value: 0 },
    vipProgress: { type: 'number', value: 0 },
    vipPointsToNextTier: { type: 'number', value: 0 },
    purchaseMultiplier: { type: 'number', value: 1 },
    remoteLoggingEnabled: { type: 'bool', value: false },
    fetchTime: { type: 'number', value: 0 },
    lastRateTime: { type: 'number', value: 0 },
    rateTimeLeft: { type: 'number', value: 0 },
    friendRequestSent: { type: 'bool', value: false },
    online: { type: 'bool', value: false },
    createdOn: { type: 'number', value: 0 },
    b2c: { type: 'int', value: 0 },
    avatarButtonDelegate: { type: 'object', value: null }, // <-- ADDED default
  }

  protected setterHooks: {
    [K in keyof ICasinoCharacterData]?: (
      value: any,
      opts: SetterHookOptions,
    ) => void
  } = {
    comboID: function (
      this: CasinoCharacterModel,
      comboID: string | null,
      opts: SetterHookOptions,
    ) {
      let parsed = parseComboID(comboID)
      if (!parsed) {
        const defaultValuesForComboParts = pick(
          (this.constructor as typeof SAModel)._allDefaults as any,
          ...COMBO_ID_PART_NAMES,
        )
        parsed = {}
        COMBO_ID_PART_NAMES.forEach((partName) => {
          const defaultDescriptor = defaultValuesForComboParts[partName] as
            | DefaultPropertyDescriptor
            | undefined
          parsed![partName] = defaultDescriptor?.value ?? null
        })
      }
      forEach(parsed, (value: any, key: string) => {
        this.set(key as keyof ICasinoCharacterData, value as any, opts)
      })
    },

    avatarURLs: function (
      this: CasinoCharacterModel,
      avatarURLs: { [key: string]: string } | undefined,
      opts: SetterHookOptions,
    ) {
      if (!avatarURLs) {return}
      forEach(AVATAR_TYPES, (type: string) => {
        if (
          !this.get(type as keyof ICasinoCharacterData) ||
          opts.force === type
        ) {
          if (
            CasinoCharacterService &&
            CasinoCharacterService.buildAvatarObject
          ) {
            CasinoCharacterService.buildAvatarObject(avatarURLs[type])
              .then((result: any) => {
                this.set(type as keyof ICasinoCharacterData, result, opts)
              })
              .catch((error) => {
                console.error(
                  `Failed to build avatar object for type ${type}: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                )
              })
          } else {
            console.error(
              `CasinoCharacterService.buildAvatarObject is not available for avatar type ${type}`,
            )
          }
        }
      })
    },
  }

  constructor(
    initialData?: Partial<ICasinoCharacterData>,
    createNewInstanceInternal: boolean = false,
  ) {
    const allowDirect = (initialData as any)?.__allowDirectConstruction === true
    if (!createNewInstanceInternal && !allowDirect) {
      console.error(
        'Do not use the constructor directly! Use factory methods from CasinoCharacterService instead.',
      )
    }
    super(initialData)
  }

  // --- Explicit Accessor Methods ---

  public getBalance(): number {
    return this.get('balance')
  }
  public setBalance(value: number, opts?: SetterHookOptions): this {
    return this.set('balance', value, opts)
  }

  public getCharacterID(): string {
    return this.get('characterID')
  }
  public setCharacterID(value: string, opts?: SetterHookOptions): this {
    return this.set('characterID', value, opts)
  }

  public getChips(): number {
    return this.get('chips')
  }
  public setChips(value: number, opts?: SetterHookOptions): this {
    return this.set('chips', value, opts)
  }

  public getComboID(): string | null {
    return this.get('comboID')
  }
  public setComboID(value: string, opts?: SetterHookOptions): this {
    return this.set('comboID', value, opts)
  }

  public getGold(): number {
    return this.get('gold')
  }
  public setGold(value: number, opts?: SetterHookOptions): this {
    return this.set('gold', value, opts)
  }

  public getHandle(): string {
    return this.get('handle')
  }
  public setHandle(value: string, opts?: SetterHookOptions): this {
    return this.set('handle', value, opts)
  }

  public getXpLevel(): number {
    return this.get('xpLevel')
  }
  public setXpLevel(value: number, opts?: SetterHookOptions): this {
    return this.set('xpLevel', value, opts)
  }

  public getMinigameTickets(): number {
    return this.get('minigameTickets')
  }
  public setMinigameTickets(value: number, opts?: SetterHookOptions): this {
    return this.set('minigameTickets', value, opts)
  }

  public getPrivateID(): string | null {
    return this.get('privateID')
  }
  public setPrivateID(value: string, opts?: SetterHookOptions): this {
    return this.set('privateID', value, opts)
  }

  public getSessionID(): string | null {
    return this.get('sessionID')
  }
  public setSessionID(value: string, opts?: SetterHookOptions): this {
    return this.set('sessionID', value, opts)
  }

  public getTotalCash(): number {
    return this.get('totalCash')
  }
  public setTotalCash(value: number, opts?: SetterHookOptions): this {
    return this.set('totalCash', value, opts)
  }

  public getVipPoints(): number {
    return this.get('vipPoints')
  }
  public setVipPoints(value: number, opts?: SetterHookOptions): this {
    return this.set('vipPoints', value, opts)
  }

  public getVipTier(): number {
    return this.get('vipTier')
  }
  public setVipTier(value: number, opts?: SetterHookOptions): this {
    return this.set('vipTier', value, opts)
  }

  public getVipProgress(): number {
    return this.get('vipProgress')
  }
  public setVipProgress(value: number, opts?: SetterHookOptions): this {
    return this.set('vipProgress', value, opts)
  }

  public getVipPointsToNextTier(): number {
    return this.get('vipPointsToNextTier')
  }
  public setVipPointsToNextTier(value: number, opts?: SetterHookOptions): this {
    return this.set('vipPointsToNextTier', value, opts)
  }

  public getPurchaseMultiplier(): number {
    return this.get('purchaseMultiplier')
  }
  public setPurchaseMultiplier(value: number, opts?: SetterHookOptions): this {
    return this.set('purchaseMultiplier', value, opts)
  }

  public getRemoteLoggingEnabled(): boolean {
    return this.get('remoteLoggingEnabled')
  }
  public setRemoteLoggingEnabled(
    value: boolean,
    opts?: SetterHookOptions,
  ): this {
    return this.set('remoteLoggingEnabled', value, opts)
  }

  public getFetchTime(): number {
    return this.get('fetchTime')
  }
  public setFetchTime(value: number, opts?: SetterHookOptions): this {
    return this.set('fetchTime', value, opts)
  }

  public getLastRateTime(): number {
    return this.get('lastRateTime')
  }
  public setLastRateTime(value: number, opts?: SetterHookOptions): this {
    return this.set('lastRateTime', value, opts)
  }

  public getRateTimeLeft(): number | undefined {
    return this.get('rateTimeLeft')
  }
  public setRateTimeLeft(
    value: number | undefined,
    opts?: SetterHookOptions,
  ): this {
    return this.set('rateTimeLeft', value, opts)
  }

  public getFriendRequestSent(): boolean {
    return this.get('friendRequestSent')
  }
  public setFriendRequestSent(value: boolean, opts?: SetterHookOptions): this {
    return this.set('friendRequestSent', value, opts)
  }

  public getOnline(): boolean {
    return this.get('online')
  }
  public setOnline(value: boolean, opts?: SetterHookOptions): this {
    return this.set('online', value, opts)
  }

  public getCreatedOn(): number {
    return this.get('createdOn')
  }
  public setCreatedOn(value: number, opts?: SetterHookOptions): this {
    return this.set('createdOn', value, opts)
  }

  public getB2c(): number {
    return this.get('b2c')
  }
  public setB2c(value: number, opts?: SetterHookOptions): this {
    return this.set('b2c', value, opts)
  }

  public getAvatarURLs(): { [key: string]: string } | undefined {
    return this.get('avatarURLs')
  }
  public setAvatarURLs(
    value: { [key: string]: string } | undefined,
    opts?: SetterHookOptions,
  ): this {
    return this.set('avatarURLs', value, opts)
  }

  public getAvatarNeutral(): any {
    return this.get('avatarNeutral')
  }
  public setAvatarNeutral(value: any, opts?: SetterHookOptions): this {
    return this.set('avatarNeutral', value, opts)
  }

  public getAvatarPos(): any {
    return this.get('avatarPos')
  }
  public setAvatarPos(value: any, opts?: SetterHookOptions): this {
    return this.set('avatarPos', value, opts)
  }

  public getAvatarNeg(): any {
    return this.get('avatarNeg')
  }
  public setAvatarNeg(value: any, opts?: SetterHookOptions): this {
    return this.set('avatarNeg', value, opts)
  }

  public getAvatarButtonDelegate(): AvatarButtonDelegate | any | undefined {
    return this.get('avatarButtonDelegate')
  } // <-- ADDED getter
  public setAvatarButtonDelegate(
    value: AvatarButtonDelegate | any | undefined,
    opts?: SetterHookOptions,
  ): this {
    return this.set('avatarButtonDelegate', value, opts)
  } // <-- ADDED setter

  // --- End Explicit Accessor Methods ---
}

// Initialize _allDefaults for the CasinoCharacterModel class itself
;(CasinoCharacterModel as any)._allDefaults = (
  CasinoCharacterModel as any
).getAllDefaults()
