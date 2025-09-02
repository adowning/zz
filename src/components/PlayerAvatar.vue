<script setup lang="ts">
import { ref, watch, onMounted, } from 'vue'
import { useVipStore } from '@/stores/vip.store'
import { useAuthStore } from '@/stores/auth.store'

const eventBus = useEventManager()

const authStore = useAuthStore()

interface Props {
  sparkle?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  sparkle: false,
})

const vipStore = useVipStore() // Use the store instance directly
const localSparkle = ref(props.sparkle)
console.log(eventBus)

const circleRef = ref<HTMLElement | null>(null) // For the glow effect, if still needed
const xpNeededForNextLevel = ref(0)
const currentXp = ref(0)


function pulseGlowEffect() {
  console.log('Pulsing glow effect')
  if (circleRef.value) {
    circleRef.value.classList.add('glow')
    localSparkle.value = true

    setTimeout(() => {
      localSparkle.value = false
    }, 1000)
    setTimeout(() => {
      circleRef.value?.classList.remove('glow')
    }, 2000)
  }
}

// Watchers
watch(() => props.sparkle, (isSparkling) => {
  if (isSparkling) {
    localSparkle.value = true
    setTimeout(() => {
      localSparkle.value = false
    }, 3000) // Animation duration
  }
})

watch(
  () => vipStore.getVipInfo,
  (newVipInfo, oldVipInfo) => {
    if (newVipInfo?.xp !== undefined) {
      const oldXp = oldVipInfo?.xp || 0
      const newXp = newVipInfo.xp
      console.log('VIP XP changed:', { oldXp, newXp })
      currentXp.value = newXp

      if (newXp > oldXp) {
        pulseGlowEffect()
      }
    }
  },
  { deep: true }
)
// Listen for XP gain events
function handleXpGain() {
  const result = vipStore.getPercentOfCurrentLevel()
  if (result) {
    xpNeededForNextLevel.value = result[2]
    currentXp.value = result[1]
    pulseGlowEffect()
  }
}

eventBus.on('xp:gain', handleXpGain)


onMounted(() => {
  try {
    // Fetch VIP levels if not already loaded
    // if (!vipStore.getVipLevels.length) {
    // await vipStore.fetchAllVipLevels()
    // }
    // Initialize XP display
    const result = vipStore.getPercentOfCurrentLevel()
    if (result) {
      xpNeededForNextLevel.value = result[2]
      currentXp.value = result[1]
    }
  } catch (error) {
    console.error('Failed to initialize VIP data:', error)
  }
  // eventBus.on('xp:gain', () => {
  //   console.log('PlayerAvatar: xp:gain event received, starting animation.')
  //   localSparkle.value = true
  //   // Turn sparkle off after animation duration
  //   setTimeout(() => {
  //     localSparkle.value = false
  //   }, 3000) // Must match animation duration
  // }, 'PlayerAvatar') // Unique target for safe un-subscription
})
</script>

<template>
  <div v-if="authStore.currentUser && vipStore.getVipInfo"
    class="relative w-[60px] h-[70px] ml-[15px] mt-[1px] z-[2]">
    <div class="relative w-[60px] h-[60px] z-[999]">
      <div ref="circleRef"
        class="player-avatar-wrapper  flex items-center justify-center overflow-hidden rounded-full w-full h-full"
        :class="{ glow: sparkle }">
        <div class="absolute inset-[3px] bg-cover bg-center rounded-full z-999 "
          style=" z-index: 9999; background-size: cover "
          :style="`background-image: url('/images/avatars/${authStore.currentUser.avatarUrl}')`" />
        <AnimatedCircularProgressBar gauge-primary-color="red" :duration="3" gauge-secondary-color="yellow"
          :gauge-width="10" :max="100" :show-percentage="false" :circle-stroke-width="10" :min="0"
          :value="currentXp / 2" class="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] z-[1] -rotate-70" />
        <!-- <CircleProgressBar stroke-width="20" :value="currentXp" :max="xpNeededForNextLevel" color-unfilled="yellow"
          animation-duration="1s" color-filled="yellow" color-back="red" :start-angle="190"
          class="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] z-[1]" /> -->
      </div>
    </div>

    <div
      class="text-base  w-[80px] absolute left-[-10px] m-auto  bottom-[6px] z-[999]  bg-white opacity-99 rounded border border-[#6f14a3] shadow-[0px_0px_4px_#6f14a3] text-black font-extrabold text-center">
      <div class="leading-2  onacona overflow-hidden text-clip  flex justify-center p-1" style="font-size: 15px">
        {{
          authStore.currentUser.username
        }}
      </div>
    </div>

    <div class="absolute top-[18px] left-[-16px] w-[36px] h-[36px] z-[9999] bg-cover cursor-pointer"
      style="background-image: url('/images/avatars/level-star.avif')">
      <div class="flex leading-1 items-center justify-center h-full text-lg onacona text-black pr-1 pt-1 "
        style="z-index: 9999; color: black">
        {{ vipStore.getVipInfo.level }}
      </div>
    </div>

    <div v-if="localSparkle" class="absolute left-[-5px] top-[-4px] w-[60px] h-[30px] z-[999999]">
      <SparklesSprite />
    </div>
  </div>
</template>

<style scoped>
/* Prefer Tailwind for styling, but keep complex animations or specific CSS here */

.glow {
  animation: pulse-glow 2s linear;
}

@keyframes pulse-glow {

  0%,
  100% {
    filter: drop-shadow(0 0 5px #c22998);
  }

  50% {
    filter: drop-shadow(0 0 10px #8b5df4);
  }
}

/* Removed other CSS that can be replaced by Tailwind or is no longer used
   (e.g., .progress, .circle-progress definitions, input[type=range], .img-wrap)
   If CircleProgressBar needs specific global styles, they should be defined where it's globally styled.
*/
</style>
