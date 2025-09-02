<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUpdate, nextTick } from 'vue'
import { tiers, xpThresholds } from './constants'
import type { Tier } from './constants'

// --- PROPS ---
const props = defineProps({
  currentXp: {
    type: Number,
    required: true,
    default: 0
  }
})

// --- REFS FOR AUTO-SCROLLING ---
const levelRefs = ref<HTMLElement[]>([])
function setLevelRef(el: any, index: number) {
  if (el) {
    levelRefs.value[index] = el
  }
}
onBeforeUpdate(() => {
  levelRefs.value = []
})

// --- COMPUTED PROPERTIES ---
const currentLevelIndex = computed(() => {
  for (let i = xpThresholds.length - 1; i >= 0; i--) {
    if (props.currentXp >= xpThresholds[i]) {
      return i
    }
  }
  return 0
})



const progressBarWidth = computed(() => {
  const levelXpStart = xpThresholds[currentLevelIndex.value]
  const levelXpEnd = xpThresholds[currentLevelIndex.value + 1] ?? levelXpStart

  const progressInLevel = (levelXpEnd - levelXpStart > 0)
    ? (props.currentXp - levelXpStart) / (levelXpEnd - levelXpStart)
    : 1

  const progressInLevelClamped = Math.max(0, Math.min(1, progressInLevel))

  const totalSegments = xpThresholds.length > 1 ? xpThresholds.length - 1 : 1
  const segmentWidth = 100 / totalSegments

  const completedSegmentsWidth = currentLevelIndex.value * segmentWidth
  const currentSegmentWidth = progressInLevelClamped * segmentWidth

  return `${completedSegmentsWidth + currentSegmentWidth}%`
})

const containerMinWidth = computed(() => xpThresholds.length * 68) // Approx 68px per level to ensure scrolling

// --- METHODS ---
function getTierForLevel(level: number): Tier {
  return tiers.slice().reverse().find(tier => level >= tier.startLevel) || tiers[0]
}

function formatXP(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0).replace('.0', '')}K`
  }
  return num.toString()
}

function scrollToActiveLevel(index: number) {
  const activeLevelEl = levelRefs.value[index]
  if (activeLevelEl) {
    activeLevelEl.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    })
  }
}

// --- LIFECYCLE HOOKS ---
watch(currentLevelIndex, (newIndex) => {
  // Wait for the DOM to update before trying to scroll
  nextTick(() => {
    scrollToActiveLevel(newIndex)
  })
})

onMounted(() => {
  // Scroll to the initial position after the component is mounted
  nextTick(() => {
    scrollToActiveLevel(currentLevelIndex.value)
  })
})
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <!-- Tier Name Display -->
    <h2 class="text-center text-xl font-bold text-purple-400 mb-4 transition-all duration-300" />

    <!-- Scrollable container -->
    <div class="w-full p-6 rounded-lg overflow-x-auto hide-scrollbar " style="max-width: 340px;">
      <!-- Inner container for all scrollable content -->
      <div class="relative" :style="{ minWidth: `${containerMinWidth}px` }">
<!-- Top Row: Levels -->
        <div class="flex items-end px-2 mb-3">
          <div
            v-for="(index) in xpThresholds"
            :key="`level-${index}`"
            :ref="el => setLevelRef(el, index)"
            class="relative flex flex-col items-center text-center flex-shrink-0 mx-2"
            :style="{ width: index === currentLevelIndex ? '64px' : '40px' }"
          >
            <template v-if="index === currentLevelIndex">
              <div class="absolute -top-2 w-4 h-4 bg-[#8b5cf6] [clip-path:polygon(50%_100%,0_0,100%_0)] z-20" />
              <div class="relative w-16 h-20 flex items-center justify-center">
                <img :src="getTierForLevel(index + 1).iconUrl" :alt="`${getTierForLevel(index + 1).name} Level ${index + 1}`" class="absolute w-full h-full">
                <span class="relative text-white font-bold z-10 flex items-center justify-center w-full h-full" :class="index + 1 >= 10 ? 'text-xl' : 'text-2xl'">{{ index + 1 }}</span>
              </div>
            </template>
            <template v-else>
              <div class="relative w-10 h-12">
                <img :src="getTierForLevel(index + 1).iconUrl" :alt="`${getTierForLevel(index + 1).name} Level ${index + 1}`" class="absolute w-full h-full" :class="{ 'opacity-50': currentLevelIndex < index }">
                <span v-if="currentLevelIndex > index" class="relative text-white font-bold z-10 flex items-center justify-center w-full h-full" :class="index + 1 >= 10 ? 'text-lg' : 'text-xl'">{{ index + 1 }}</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Middle Row: Progress Bar -->
        <div class="relative w-full h-2 bg-[#2d205a] rounded-full">
          <div class="absolute h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500 ease-out" :style="{ width: progressBarWidth }" />
          <!-- FIX: This container now has its children sized to match the icons above, ensuring alignment -->
          <div class="absolute top-1/2 -translate-y-1/2 w-full flex items-center px-2">
            <div
              v-for="(_, index) in xpThresholds"
              :key="`dot-wrapper-${index}`"
              class="flex justify-center flex-shrink-0 mx-2"
              :style="{ width: index === currentLevelIndex ? '64px' : '40px' }"
            >
              <span
                class="h-3 w-3 rounded-full"
                :class="currentLevelIndex >= index ? 'bg-purple-500 border-2 border-[#2d205a]' : 'bg-[#2d205a]'"
              />
            </div>
          </div>
        </div>

        <!-- Bottom Row: XP Labels -->
        <!-- FIX: This container also has its children sized to match the icons, ensuring alignment -->
        <div class="flex w-full mt-2 text-xs text-[#928cc8] font-semibold whitespace-nowrap px-2">
          <div
            v-for="(xp, index) in xpThresholds"
            :key="`label-wrapper-${index}`"
            class="flex-shrink-0 mx-2"
            :style="{ width: index === currentLevelIndex ? '64px' : '40px' }"
          >
            <span
              class="block w-full"
              :class="{
                'text-left': index === 0,
                'text-right': index === xpThresholds.length - 1,
                'text-center': index > 0 && index < xpThresholds.length - 1,
              }"
            >
              <template v-if="index === 0 || (index + 1) % 5 === 0 || index === xpThresholds.length - 1">
                {{ formatXP(xp) }}
              </template>
              <template v-else>&nbsp;</template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>