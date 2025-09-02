<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DailyWheel from './DailyWheel.vue'

const target = ref()
const eventBus = useEventManager()
const showWheel = ref(true)
const isSpinning = ref(false)

// Define prizes for the wheel
const prizes = ref([
  { id: 1, name: 'Day Bonus', value: '$55.03', icon: '/images/wheel/wheel_daybonus.png' },
  { id: 2, name: 'VIP Bonus', value: '$25.50', icon: '/images/wheel/wheel_vipbonus.png' },
  { id: 3, name: 'Friend Bonus', value: '$15.25', icon: '/images/wheel/wheel_friendbonus.png' },
  { id: 4, name: 'Coins', value: '1000', icon: '/images/wheel/wheel_coins.png' },
  { id: 5, name: 'Crystals', value: '50', icon: '/images/wheel/wheel_crystals.png' },
  { id: 6, name: 'Free Spin', value: '1', icon: '/images/wheel/wheel_freespin.png' }
])

function close() {
  if (target.value !== undefined) {
    target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
    setTimeout(() => {
      eventBus.emit('wheelOpen', false)
      eventBus.emit('hideBars', false)
    }, 500)
  } else {
    console.log('target is undefined')
  }
}

function handleSpinStart() {
  isSpinning.value = true
}
eventBus.on('wheelOpen', (val) => {
  if (val === false) {
    target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
  }
})
function handleSpinComplete(prize: any) {
  isSpinning.value = false
  // Here you can handle the prize won
  console.log('Prize won:', prize)
  // You might want to show a notification or update the user's balance
}

// Setup event listeners
onMounted(() => {
  showWheel.value = true
})

// Cleanup event listeners to prevent memory leaks
onUnmounted(() => {
  eventBus.off('wheelOpen', close)
})
</script>

<template>
  <div v-if="showWheel" class="">
    <div ref="target"
      class="fixed left-0 top-10 flex flex-col items-center justify-start overflow-y-hidden animate__animated animate__bounceIn"
      style="
        background-image: url('/images/generic-back2.avif');
        width: 100vw;
        height: 80vh;
        border-image-slice: calc(50 / 184 * 100%) calc(80 / 284 * 100%) fill;
        border-image-repeat: round;
        border-image-width: 22px;
        padding: 2px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      ">
      <img src="/images/common/close.png" style="
          z-index: 999;
          width: 50px;
          height: 50px;
          position: absolute;
          right: 0px;
          top: 0px;
          cursor: pointer;
        " @click="close()">
      <div style="margin: auto" class="glow w-full pt-5">
        <h1>DAILY SPIN</h1>
      </div>
      <DailyWheel :prizes="prizes" :can-spin="!isSpinning" style="width: 98vw; height: 100%"
        @spin-start="handleSpinStart" @spin-complete="handleSpinComplete" />
    </div>
  </div>
</template>
