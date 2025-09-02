<script setup lang="ts">
import { ref } from 'vue'
import { REWARD_TIERS } from './constants'
import RewardTierCard from './RewardTierCard.vue'

const scrollContainerRef = ref<HTMLDivElement | null>(null)

function scroll(direction: 'left' | 'right') {
  if (scrollContainerRef.value) {
    const scrollAmount = direction === 'left' ? -300 : 300
    scrollContainerRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl lg:text-4xl font-bold text-white">
Statuses and levels
</h2>
      <div class="hidden md:flex items-center gap-3">
        <button class="bg-[#26254E] p-3 rounded-full hover:bg-[#3b3a61] transition-colors" @click="scroll('left')">
          <img src="https://images.cashflowcasino.com/frvip/arrowlefticon.webp" alt="Previous" class="w-6 h-6">
        </button>
        <button class="bg-[#26254E] p-3 rounded-full hover:bg-[#3b3a61] transition-colors" @click="scroll('right')">
          <img src="https://images.cashflowcasino.com/frvip/arrowrighticon.webp" alt="Next" class="w-6 h-6">
        </button>
      </div>
    </div>

    <div ref="scrollContainerRef" class="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
      <RewardTierCard v-for="(tier, index) in REWARD_TIERS" :key="index" :tier="tier" />
    </div>
  </section>
</template>
