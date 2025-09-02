<script setup lang="ts">
import type { RewardTier } from './types'

defineProps<{
  tier: RewardTier;
}>()
</script>

<template>
  <div class="relative">
   <div class="pt-14">
        <!-- Main Reward Tier Card -->
        <!-- Reduced padding -->
        <div class="relative w-[245px]  rounded-2xl shadow-lg p-4 text-white" :style="{ background: tier.gradient }">
<!-- Tier Icon -->
            <!-- Adjusted position and size -->
            <div class="absolute -top-14 left-1/2 -translate-x-1/2">
                <div class="w-24 h-24 flex items-center justify-center">
                     <img :src="`https://images.cashflowcasino.com/frvip/${tier.icon}.webp`" :alt="`${tier.name} Icon`" class="w-full h-full object-contain drop-shadow-lg">
                </div>
            </div>

            <!-- Tier Title -->
            <!-- Adjusted padding, margin, and font size -->
            <div class="text-center mb-4 pt-10">
                <h1 class="text-2xl font-bold">
{{ tier.name }}
</h1>
                <p class="text-gray-300 text-sm">
{{ tier.levels }}
</p>
            </div>

            <!-- Rewards List -->
            <!-- Reduced vertical spacing -->
            <div class="space-y-2.5">
      <div class="flex-grow">
<div class="space-y-4 text-sm">
        <div class="flex justify-between items-center">
          <span class="text-white/80">{{ tier.offers }}</span>
          <img src="https://images.cashflowcasino.com/frvip/default%20(17).webp" alt="Checkmark" class="w-5 h-5">
        </div>

        <div class="border-t border-white/20" />

        <div>
          <div class="flex justify-between items-center">
            <span class="text-white/80">Lucky Spin</span>
            <div class="text-right">
              <p class="text-xs text-yellow-300 font-semibold">
up to
</p>
              <p class="font-bold flex items-center justify-end gap-1.5">
<img src="https://images.cashflowcasino.com/frvip/default.webp" alt="Coins" class="w-4 h-4">
                <span class="text-green-300 font-bold">${{ tier.luckySpin.value }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-white/20" />

        <div>
          <div class="flex justify-between items-center">
            <span class="text-white/80">Level Rewards</span>
            <div class="font-bold flex items-center justify-end gap-2">
               <template v-if="tier.levelRewards.coins">
                 <img src="https://images.cashflowcasino.com/frvip/default.webp" alt="Coins" class="w-4 h-4">
                 <span>{{ tier.levelRewards.value }}</span>
               </template>
               <img src="https://images.cashflowcasino.com/frvip/fp.webp" alt="Gem" class="w-5 h-5">
               <span>{{ tier.levelRewards.gems }}</span>
            </div>
          </div>
        </div>

        <div class="border-t border-white/20" />

         <div>
          <div class="flex justify-between items-center">
            <span class="text-white/80">Daily PlayBack</span>
            <span class="bg-green-500/80 text-white text-xs font-bold px-2 py-0.5 rounded-full">{{ tier.dailyPlayback.percentage }}%</span>
          </div>
          <p class="text-right font-bold text-lg mt-1">
            MAX <span class="text-yellow-400">&raquo;</span>
            <span class="text-green-300">${{ tier.dailyPlayback.maxValue }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
</template>
