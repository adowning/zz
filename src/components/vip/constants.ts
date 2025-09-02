import type { HowItWorksStep, RewardTier } from './types'

export const REWARD_TIERS: RewardTier[] = [
  {
    name: 'Bronze',
    levels: 'Levels 1-10',
    gradient: 'linear-gradient(177deg, #E74900 2.23%, #971A3B 51.89%, #45003B 97.3%)',
    icon: 'bronze',
    offers: 'Bronze Offers',
    luckySpin: { coins: '275K', value: '5.00' },
    levelRewards: { coins: '45K', value: '0.20', gems: 25 },
    dailyPlayback: { maxCoins: '20K', maxValue: '20.00', percentage: 5 },
  },
  {
    name: 'Silver',
    levels: 'Levels 11-20',
    gradient: 'linear-gradient(0deg, #280086 0%, #5F41D5 50.03%, #7B95FF 100%)',
    icon: 'silver',
    offers: 'Silver Offers',
    luckySpin: { coins: '375K', value: '15.00' },
    levelRewards: { coins: '', value: '6.00', gems: 60 },
    dailyPlayback: { maxCoins: '50K', maxValue: '50.00', percentage: 5 },
  },
  {
    name: 'Gold',
    levels: 'Levels 21-30',
    gradient: 'linear-gradient(3deg, #860002 2.14%, #FF5E00 49.91%, #FFD000 97.67%)',
    icon: 'gold',
    offers: 'Gold Offers',
    luckySpin: { coins: '400K', value: '20.00' },
    levelRewards: { coins: '', value: '8.00', gems: 45 },
    dailyPlayback: { maxCoins: '75K', maxValue: '75.00', percentage: 5 },
  },
  {
    name: 'Platinum',
    levels: 'Levels 31-40',
    gradient: 'linear-gradient(4deg, #360D5A 2.9%, #6F20A9 49.55%, #B742FF 96.28%)',
    icon: 'platinum',
    offers: 'Platinum Offers',
    luckySpin: { coins: '500K', value: '30.00' },
    levelRewards: { coins: '', value: '12.50', gems: 45 },
    dailyPlayback: { maxCoins: '100K', maxValue: '100.00', percentage: 5 },
  },
  {
    name: 'Sapphire',
    levels: 'Levels 41-50',
    gradient: 'linear-gradient(0deg, #000286 0%, #2543B8 50.03%, #5375FF 100%)',
    icon: 'sapphire',
    offers: 'Sapphire Offers',
    luckySpin: { coins: '', value: '15.00' },
    levelRewards: { coins: '', value: '15.00', gems: 50 },
    dailyPlayback: { maxCoins: '', maxValue: '150.00', percentage: 5 },
  },
]

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { step: 1, title: 'Play games', icon: '1-options' },
  { step: 2, title: 'Earn Experience Points', icon: '2-options' },
  { step: 3, title: 'Level up', icon: '3-options' },
  { step: 4, title: 'Enjoy your rewards!', icon: '4-options' },
]

export interface Tier {
  name: string;
  startLevel: number;
  iconUrl: string;
}

export const tiers: Tier[] = [
    { name: 'Bronze', startLevel: 1, iconUrl: 'https://images.cashflowcasino.com/frvip/bronze.webp' },
    { name: 'Silver', startLevel: 11, iconUrl: 'https://images.cashflowcasino.com/frvip/silver.webp' },
    { name: 'Gold', startLevel: 21, iconUrl: 'https://images.cashflowcasino.com/frvip/gold.webp' },
    { name: 'Platinum', startLevel: 31, iconUrl: 'https://images.cashflowcasino.com/frvip/platinum.webp' },
    { name: 'Sapphire', startLevel: 41, iconUrl: 'https://images.cashflowcasino.com/frvip/sapphire.webp' }
]

export const xpThresholds: number[] = [
    0,
200,
500,
850,
1000,
2000,
3000,
5000,
8000,
12000, // Bronze (1-10)
    13000,
15000,
18000,
22000,
27000,
33000,
40000,
48000,
57000,
67000, // Silver (11-20)
    78000,
90000,
103000,
117000,
132000,
148000,
165000,
183000,
202000,
222000, // Gold (21-30)
    243000,
265000,
288000,
312000,
337000,
363000,
390000,
418000,
447000,
477000, // Platinum (31-40)
    508000,
540000,
573000,
607000,
642000,
678000,
715000,
753000,
792000,
832000 // Sapphire (41-50)
]