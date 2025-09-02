/* eslint-disable @typescript-eslint/no-namespace */
// This file must be a module, so we include an empty export.
export {};

declare global {
  namespace PrismaJson {
    // Define a type for a user's profile information.
//  type RedtigerSettings = {
//     readonly success: boolean;
//     readonly result:  Result;
// }

 type RtgSettingsResult = {
    readonly user:     User;
    readonly game:     ResultGame;
    readonly launcher: Launcher;
    readonly jackpots: null;
}

 type ResultGame = {
    readonly cols?:                              number;
    readonly rows?:                              number;
    readonly offset?:                            number;
    readonly multiplierSequence?:                MultiplierSequence;
    readonly extraWin?:                          ExtraWin;
    readonly lines?:                             Array<number[]>;
    readonly tiles?:                             Tile[];
    readonly reelsBuffer?:                       Array<Array<number[]>>;
    readonly paysType?:                          string;
    readonly features?:                          string[];
    readonly singlePayline?:                     boolean;
    readonly hasState?:                          boolean;
    readonly version?:                           string;
    readonly rtp?:                               RTP;
    readonly volatilityIndex?:                   string;
    readonly maxMultiplier?:                     string;
    readonly maxWinlineHitRate?:                 string;
    readonly maxMultiplierHitRate?:              string;
    readonly maxMultiplierHitFrequency?:         string;
    readonly maxMultiplierWinLines?:             string;
    readonly maxMultiplierWinLinesHitRate?:      string;
    readonly maxMultiplierWinLinesHitFrequency?: string;
    readonly hasGambleGame?:                     boolean;
    readonly gameType?:                          string;
    readonly stateful?:                          boolean;
    readonly hasChoices?:                        boolean;
    readonly stateExpireDays?:                   null;
    readonly hasBonuses?:                        boolean;
    readonly pendingRoundDays?:                  number;
    readonly skin?:                              null;
    readonly hasFeatureBuy?:                     boolean;
}

 type ExtraWin = {
    readonly bigWin?:   string;
    readonly superWin?: string;
    readonly megaWin?:  string;
}

 type MultiplierSequence = {
    readonly Progress?: Progress[];
}

 type Progress = {
    readonly count?:      number;
    readonly multiplier?: number;
    readonly spins?:      number;
}

 type RTP = {
    readonly game?: RTPGame;
}

 type RTPGame = {
    readonly default?: string;
}

 type Tile = {
    readonly id?:   number;
    readonly type?: string;
    readonly pays?: string[];
}


 type Launcher = {
    readonly version?: string;
}

 type User = {
    readonly balance?:             Balance;
    readonly notifications?:       any[];
    readonly messages?:            any[];
    readonly bonuses?:             any[];
    readonly tournaments?:         any[];
    readonly vouchers?:            any[];
    readonly userId?:              number;
    readonly country?:             string;
    readonly casino?:              string;
    readonly vertical?:            string;
    readonly currency?:            Currency;
    readonly token?:               string;
    readonly sessionId?:           string;
    readonly sessionNetPosition?:  string;
    readonly aamsParticipationId?: null;
    readonly aamsSessionId?:       null;
    readonly depositedAmount?:     string;
    readonly maxDeposit?:          string;
    readonly canGamble?:           boolean;
    readonly lastWin?:             string;
    readonly prevRounds?:          any[];
    readonly limits?:              Limits;
    readonly stakes?:              Stakes;
    readonly autoplay?:            Autoplay;
    readonly serverTime?:          Date;
    readonly additional?:          null;
}

 type Autoplay = {
    readonly type?:    string;
    readonly options?: Options;
}

 type Options = {
    readonly spins?:            Spins;
    readonly stopOnFeature?:    StopOnFeature;
    readonly stopOnLossLimits?: StopOnLossLimits;
    readonly stopOnWin?:        StopOnWin;
    readonly hasRestart?:       boolean;
}

 type Spins = {
    readonly values?:  string[];
    readonly default?: number;
}

 type StopOnFeature = {
    readonly enabled?: boolean;
}

 type StopOnLossLimits = {
    readonly mandatory?: boolean;
    readonly enabled?:   boolean;
    readonly values?:    string[];
    readonly default?:   number;
}

 type StopOnWin = {
    readonly enabled?: boolean;
    readonly values?:  string[];
}

 type Balance = {
    readonly cash?:            string;
    readonly freeBets?:        string;
    readonly sessionCash?:     string;
    readonly sessionFreeBets?: string;
    readonly bonus?:           string;
}

 type Currency = {
    readonly code?:   string;
    readonly symbol?: string;
}

 type Limits = {
    readonly maxGambleStake?: string;
    readonly maxTotalStake?:  TotalStake;
    readonly minTotalStake?:  TotalStake;
    readonly spinDuration?:   null;
}

 type TotalStake = {
    readonly total?: string;
}

 type Stakes = {
    readonly defaultIndex?: number;
    readonly lastIndex?:    number;
    readonly types?:        string[];
}

  }
}
