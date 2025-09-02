export interface RewardTier {
  name: string;
  levels: string;
  gradient: string;
  icon: string;
  offers: string;
  luckySpin: {
    coins: string;
    value: string;
  };
  levelRewards: {
    coins: string;
    value: string;
    gems: number;
  };
  dailyPlayback: {
    maxCoins: string;
    maxValue: string;
    percentage: number;
  };
}

export interface HowItWorksStep {
  step: number;
  title: string;
  icon: string;
}