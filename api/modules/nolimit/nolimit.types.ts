
export interface NolimitServerMessage {
    messages: any[];
    game: Game;
    features: Features;
    remainingFreeSpins: number;
    balances: Balances;
    balance: string;
    realityCheck: RealityCheck;
    id: string;
    extPlayerKey: string;
}

export interface Balances {
    TOTAL_BALANCE: string;
}

export interface Features {
    available: any[];
}

export interface Game {
    reels: Array<string[]>;
    evaluatedArea: Array<string[]>;
    betWayWins: any[];
    totalSpinWinnings: number;
    accumulatedRoundWin: number;
    playedBetValue: number;
    mode: string;
    nextMode: string;
    wasFeatureBuy: boolean;
    brokeTheBank: boolean;
    freespinsTriggeredThisSpin: boolean;
    freespinsPlayed: number;
    freespinsLeft: number;
    boostedBet: boolean;
    serverTestInfo: ServerTestInfo;
    totalSpinsPlayed: number;
    symbolSizes: Array<number[]>;
    removedSymbols: Array<string[]>;
    multiplier: number;
    coinValuesPreviousSpin: Array<number[]>;
    coinValues: Array<number[]>;
    upgradeColumn: boolean[];
    accumulatedFSRoundWin: number;
    dynamiteHitCoordinates: any[];
    necromancerHitCoordinates: any[];
    waysWonTotalRound: number;
    beforeFreespinsArea: any[];
    scatterCount: number;
    reelsAfterCollapse: any[];
    wildMiningTriggered: boolean;
}

export interface ServerTestInfo {
}

export interface RealityCheck {
    winnings: number;
}

export interface NolimitClientMessage {
    type: string;
    content: Content;
    protocol: string;
    data: Data;
    id: string;
}

export interface Content {
    type: string;
    bet: string;
}

export interface Data {
    extPlayerKey: string;
}

export interface NolimitInitResponse {
    messages:                any[];
    replayBaseUrl:           string;
    gameClientConfiguration: GameClientConfiguration;
    gameInfo:                GameInfo;
    currency:                Currency;
    rtp:                     RTP;
    gameRoundExpiryInDays:   number;
    realityCheck:            RealityCheck;
    featureBet:              boolean;
    betLevels:               BetLevels;
    featureBetLevels:        FeatureBetLevels;
    allowedFeatureTypes:     string[];
    allowedGameFeatures:     string[];
    allowedFeatureBets:      string[];
    allowedGameModes:        any[];
    game:                    NolimitInitResponseGame;
    features:                NolimitInitResponseFeatures;
    remainingFreeSpins:      number;
    balances:                Balances;
    balance:                 string;
    init:                    string;
    id:                      string;
    extPlayerKey:            string;
}

export interface Balances {
    TOTAL_BALANCE: string;
}

export interface BetLevels {
    bet:                  string;
    betLevels:            string[];
    availableBetLevels:   string[];
    unavailableBetLevels: any[];
}

export interface Currency {
    code:   string;
    symbol: string;
    before: boolean;
}

export interface FeatureBetLevels {
    FREESPIN_LEVEL_1: string[];
    FREESPIN_LEVEL_2: string[];
    FREESPIN_LEVEL_3: string[];
    GUARANTEED_DWARF: string[];
    LUCKY_DRAW:       string[];
    BOOSTED_BET:      string[];
}

export interface NolimitInitResponseFeatures {
}

export interface NolimitInitResponseGame {
    symbolValues:            SymbolValues;
    featureBuyTimesBetValue: FeatureBuyTimesBetValue[];
    isRestoreState:          boolean;
    reels:                   Array<string[]>;
    accumulatedRoundWin:     number;
    mode:                    string;
    nextMode:                string;
    wasFeatureBuy:           boolean;
    boostedBet:              boolean;
    freespinsLeft:           number;
    totalSpinsPlayed:        number;
    symbolSizes:             Array<number[]>;
    removedSymbols:          Array<null[]>;
    multiplier:              number;
    coinValues:              Array<number[]>;
    upgradeColumn:           boolean[];
    accumulatedFSRoundWin:   number;
    waysWonTotalRound:       number;
    beforeFreespinsArea:     Array<null[]>;
    scatterCount:            number;
    freespinsPlayed:         number;
}

export interface FeatureBuyTimesBetValue {
    name:            string;
    type:            string;
    additionalTypes: any[];
    price:           number;
}

export interface SymbolValues {
    M1: { [key: string]: number };
    M2: { [key: string]: number };
    L1: { [key: string]: number };
    M3: { [key: string]: number };
    L2: { [key: string]: number };
    M4: { [key: string]: number };
    L3: { [key: string]: number };
    M5: { [key: string]: number };
    L4: { [key: string]: number };
    L5: { [key: string]: number };
}

export interface GameClientConfiguration {
    gambleGameRoundCloseIntervalHours: number;
    showNetPosition:                   boolean;
    operator:                          string;
    nolimitWinnersEnabled:             boolean;
    fastSpinEnabled:                   boolean;
    gameRoundCloseInterval:            number;
    autoPlaySettings:                  AutoPlaySettings;
    showSimulatedMaximumPayout:        boolean;
    gameRoundCloseIntervalType:        string;
    hideRtp:                           boolean;
    gambleIntoBonusAllowed:            boolean;
    showRtpWatermark:                  boolean;
    cryptoCurrencyRules:               boolean;
    boostedBetLockedReels:             boolean;
    showGameVersionInGuiGuide:         boolean;
    boostedBetAllowed:                 boolean;
    showMaxWinProbabilityWatermark:    boolean;
    belowStakeWinRestriction:          boolean;
    jurisdictionName:                  string;
    extraSpinAllowed:                  boolean;
    operatorGroup:                     string;
    gambleFiftyFiftyAllowed:           boolean;
    minimumSpinTime:                   number;
    maxInactivityInMinutes:            number;
    featureBuyEnabled:                 boolean;
    boostedBetExtraRows:               boolean;
    clockSettings:                     ClockSettings;
    actionSpin:                        boolean;
}

export interface AutoPlaySettings {
    autoplayAllowed:               boolean;
    autoplayRounds:                number[];
    autoplayRequiresStopLossLimit: boolean;
    turnOffAutoplayOnBonus:        boolean;
}

export interface ClockSettings {
    show:                 boolean;
    allowSetting:         boolean;
    useSessionTime:       boolean;
    showSessionTimeUnder: boolean;
}

export interface GameInfo {
    displayName:              string;
    maxMultiplier:            number;
    maxMultiplierProbability: number;
    volatility:               string;
}

export interface RealityCheck {
    winnings: number;
}

export interface RTP {
    single:   number;
    features: RTPFeatures;
}

export interface RTPFeatures {
    BOOSTED_BET:      BoostedBet;
    FREESPIN_LEVEL_1: BoostedBet;
    FREESPIN_LEVEL_2: BoostedBet;
    FREESPIN_LEVEL_3: BoostedBet;
    GUARANTEED_DWARF: BoostedBet;
    LUCKY_DRAW:       BoostedBet;
}

export interface BoostedBet {
    single: number;
}
