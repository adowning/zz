<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Prize {
  id: number
  name: string
  value: string
  color?: string
  icon?: string
}

interface Props {
  prizes: Prize[]
  spinningDuration?: number
  canSpin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  spinningDuration: 6000,
  canSpin: true
})

const emit = defineEmits<{
  'spin-complete': [prize: Prize]
  'spin-start': []
}>()

// Reactive state
const state = ref({
  isSpinning: false,
  currentRotation: 0,
  winningPrize: null as Prize | null,
  spinCount: 0
})

// Refs for DOM elements
const wheelRef = ref<HTMLElement>()
const chocklightRef = ref<HTMLElement>()
const buttonRef = ref<HTMLElement>()

// Calculate prize angles based on number of prizes
const prizeAngles = computed(() => {
  const segmentAngle = 360 / props.prizes.length
  return props.prizes.map((_, index) => index * segmentAngle)
})

// Find the closest prize angle to a given rotation
function findWinningPrize(rotation: number): Prize {
  const normalizedRotation = rotation % 360
  const adjustedRotation = (360 - normalizedRotation + 90) % 360 // Adjust for wheel orientation

  let closestIndex = 0
  let minDiff = Math.abs(prizeAngles.value[0] - adjustedRotation)

  for (let i = 1; i < prizeAngles.value.length; i++) {
    const diff = Math.abs(prizeAngles.value[i] - adjustedRotation)
    if (diff < minDiff) {
      minDiff = diff
      closestIndex = i
    }
  }

  return props.prizes[closestIndex]
}

// Wheel styling
const wheelStyle = computed(() => ({
  transform: `rotate(${state.value.currentRotation}deg)`,
  transition: state.value.isSpinning ? `transform ${props.spinningDuration}ms cubic-bezier(0.23, 1, 0.32, 1)` : 'none'
}))

// Spin the wheel
function spin() {
  if (!props.canSpin || state.value.isSpinning) {return}

  state.value.isSpinning = true
  state.value.spinCount++
  emit('spin-start')

  // Calculate random spin amount (multiple full rotations + random segment)
  const fullRotations = 5 + Math.floor(Math.random() * 3) // 5-7 full rotations
  const randomSegment = Math.random() * 360
  const totalRotation = fullRotations * 360 + randomSegment

  state.value.currentRotation += totalRotation

  // Handle spin completion
  setTimeout(() => {
    const winningPrize = findWinningPrize(state.value.currentRotation)
    state.value.winningPrize = winningPrize
    state.value.isSpinning = false

    // Snap to exact prize position
    const snapRotation = Math.round(state.value.currentRotation / 360) * 360 +
      prizeAngles.value[props.prizes.indexOf(winningPrize)]
    state.value.currentRotation = snapRotation

    emit('spin-complete', winningPrize)
  }, props.spinningDuration)
}

// Cleanup function to prevent memory leaks
function cleanup() {
  // Remove any event listeners if they were added
  if (buttonRef.value) {
    buttonRef.value.replaceWith(buttonRef.value.cloneNode(true))
  }
}

// Lifecycle hooks
onMounted(() => {
  // Add click event listener to button
  if (buttonRef.value) {
    buttonRef.value.addEventListener('click', spin)
  }
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div class="wheel-container" style="
      width: 100vw;
      height: 100vh;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('/images/wheel/wheel_background.png');
      position: relative;
    ">
    <!-- Wheel -->
    <img ref="wheelRef" class="wheel" :style="wheelStyle" src="/images/wheel/wheel_board.png"
      style="position: absolute; padding: 10px">

    <!-- Chock -->
    <img class="chock" src="/images/wheel/wheel_chock.png"
      style="position: absolute; width: 100px; left: calc(50% - 50px); top: 4px">

    <!-- Chock light with animation -->
    <img v-show="state.isSpinning" ref="chocklightRef"
      class="chocklight animate__animated animate__pulse animate__infinite animate__faster"
      src="/images/wheel/wheel_chocklight.png" style="
        position: absolute;
        width: 100px;
        left: calc(50% - 35px);
        top: 5px;
        height: 150px;
        width: 70px;
      ">

    <!-- Spin button -->
    <img ref="buttonRef" class="button animate__animated animate__fadeIn spin-button"
      :class="{ disabled: !props.canSpin || state.isSpinning }" src="/images/wheel/wheel_button.png"
      style="position: absolute; padding: 50px; cursor: pointer"
      :style="{ opacity: props.canSpin && !state.isSpinning ? 1 : 0.5 }">

    <!-- Result display -->
    <div v-if="state.winningPrize" class="result-overlay animate__animated animate__fadeIn">
      <img class="button animate__animated animate__fadeIn" src="/images/logo.png" style="
          position: absolute;
          padding: 0px;
          width: 120px;
          left: calc(50% - 60px);
          top: calc(50% - 80px);
        ">

      <div class="prize-display flex flex-col items-center justify-end" style="
          width: 100%;
          position: absolute;
          bottom: 4px;
          top: 30px;
          margin: auto;
        ">
        <div class="prize-container animate__animated animate__fadeIn flex flex-col items-center justify-end pt-4"
          style="
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('/images/wheel/wheel_scroll.avif');
            padding: 0px;
            margin: 0px;
            left: 0px;
            bottom: 0px;
            height: 90%;
            width: 95%;
          ">
          <div class="prize-content flex flex-col items-center justify-center gap-0 pt-6" style="
              width: 100%;
              height: 100%;
              margin: auto;
              padding-left: 12px
            ">
            <img class="prize-icon animate__animated animate__fadeIn animate__delay-1s"
              :src="state.winningPrize.icon || '/images/wheel/wheel_daybonus.png'" style="height: 25%; margin: auto">
            <div class="prize-amount honk animate__animated animate__bounceIn animate__delay-3s" style="
                font-size: 60px;
                line-height: 1;
                letter-spacing: 4px;
                margin: auto;
                height: 15%;
                width: 140px;
              ">
              {{ state.winningPrize.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wheel {
  transition: transform 6s cubic-bezier(0.23, 1, 0.32, 1);
}

.spin-button {
  cursor: pointer;
  user-select: none;
}

.spin-button.disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.result-overlay {
  pointer-events: none;
}

.prize-display {
  pointer-events: none;
}
</style>