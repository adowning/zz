<script setup lang="ts">
import SpriteAnimator from './SpriteAnimator.vue'

// const eventManager = useEventManager()

const { isMobile } = useScreen()

const eventManager = useEventManager()

</script>

<template>
  <footer
    class="animate__animated animate__fadeIn animate__slower bottom-0 left-0 flex h-[50px] w-full items-end justify-between align-end bg-transparent px-2 pb-4 text-sm leading-3 tracking-tighter text-gold"
    :class="isMobile ? 'fixed' : 'absolute'"
     style="
      background-image: url('/images/bottom/slice.avif');
      background-size: contain;
      background-position-y: 70%;
      color: yellow;
      background-repeat: repeat-x;
      
    ">
    <div class="onacona  flex flex-col items-center text-[18px] leading-2.5 tracking-[-.1em]text-white"
      style="transform: translateY(10px)" @click=" eventManager.emit('wheelOpen', true); eventManager.emit('hideBars', true)
        ">  
      <SpriteAnimator image-url="wheel_sheet" :width="78" :height="50"
       :framerate="10" />
      <span class="">Wheel</span>
    </div>
    <div class="onacona animate__animated animate__fadeIn animate__slower flex flex-col items-center text-[18px] leading-2.5 tracking-[-.1em]"
      style="transform: translateY(10px)" @click="eventManager.emit('leaderBoardOpen', true)">
     
      <SpriteAnimator 
        image-url="leadernew_sheet" :width="60" :height="60" 
         :loop-delay="7" />
      <span class="">Leaders</span>
    </div>
    <div class="onacona mb-2 flex min-w-[20%] flex-col items-center text-[18px] leading-2.5 tracking-[-.1em] ">
      <ChatPanel />
    </div>
    <div class="onacona flex flex-col items-center text-[18px] leading-2.5 tracking-[-.1em] "
      style="transform: translateY(10px)" @click="  eventManager.emit('shopOpen', true); eventManager.emit('hideBars', true)
        ">
      <SpriteAnimator  image-url="vault_sheet" :width="65" :height="65"
      :loop-delay="9" />
      <span class="">Vault</span>
    </div>
    <div class="onacona flex flex-col items-center text-[18px] leading-2.5 tracking-[-.1em] mt-5"
      style="transform: translateY(10px)" @click=" eventManager.emit('rewardsOpen', true); eventManager.emit('hideBars', true)
        ">
        <div style="transform: translateY(20px)  translateX(-8px)" class="pb-1">
      <SpriteAnimator 
         :framerate="50" image-url="rewards_sheet" :width="80" :height="80"
        :loop-delay="12" />
        </div>
      
        <span class="">Rewards</span>

    </div>
  </footer>
</template>

<style scope lang="css">
/* .text-gradient {
  color: #491F5C;
  background-image: linear-gradient(45deg, #491F5C, #FF61B0 50%, #8B49D6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */
</style>
