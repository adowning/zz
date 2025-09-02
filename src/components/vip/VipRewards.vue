<script setup lang="ts">
import FunrizeClubProgress from '@/components/vip/FunrizeClubProgress.vue'
import StatusesAndLevels from '@/components/vip/StatusesAndLevels.vue'
import HowItWorks from '@/components/vip/HowItWorks.vue'
import Footer from '@/components/vip/VipFooter.vue'

// const vipStore = useVipStore()
const closePressed = ref(false)
const target = ref()
const eventManager = useEventManager()


function clickClose() {
  console.log('clickClose')
  target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
  setTimeout(() => {
    eventManager.emit('rewardsOpen', false)
  }, 300)
}

</script>

<template>
  <div ref="target"
    class="animate__animated animate__bounceIn zIndex-99999 w-screen h-screen flex flex-col items-center justify-start overflow-y-hidden absolute top-0 left-0">
    <div class="fixed left-0 top-0 flex flex-col items-center justify-start overflow-y-hidden" style="
        width: 100vw;
        margin: auto;
        height: 90vh;
        background-repeat: no-repeat;
        border-image: url('/images/common/cell-2.png') 20 20 20 20 fill / 20px 20px 20px 20px;
        padding: 20px 20px 20px 20px;
        max-width: 480px;
        z-index: 99999999;
        margin-top: 7vh;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      ">
      <div class="  text-white font-poppins overflow-x-hidden max-w-[90vw] m-auto justify-start p-2">
        <div class="absolute right-0 top-1 flex" @click="clickClose()">
          <img :src="`${closePressed ? '/images/common/close.png' : '/images/common/close.png'}`"
            style="z-index: 999; width: 40px; height: 40px; right: 0px; top: 0px">
        </div>
        <!-- <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12"> -->
        <!-- <div class="space-y-16 md:space-y-24"> -->
        <FunrizeClubProgress />
        <StatusesAndLevels />
        <HowItWorks />
        <!-- </div> -->
        <!-- </main> -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<style>
/* You can place global styles here if needed */
</style>