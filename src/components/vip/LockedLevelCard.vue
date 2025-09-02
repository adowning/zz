<script setup lang="ts">
</script>

<template>
  <!-- <div style="min-height: 80px; display: flex; align-items: center" /> -->
  <div
    class="relative mt-12 flex-shrink-0 w-full max-w-sm mx-auto bg-gradient-to-br from-[#23003c] to-[#151531] rounded-2xl p-3 text-center shadow-lg">
    <!-- <div class="absolute inset-0 " /> -->
    <div class="relative w-full max-w-sm mx-auto aspect-square rounded-2xl">
      <img src="https://images.cashflowcasino.com/frvip/status-portal-scene.webp" alt="Portal Scene"
        class="absolute inset-0 bottom-0 mt-12 w-full h-full object-contain rounded-2xl">

      <img src="https://images.cashflowcasino.com/frvip/particles-1.webp" alt="Particles"
        class="absolute inset-0 w-2/3 left-[14%] h-full object-contain mix-blend-screen opacity-50 animate-pulse">
      <img src="https://images.cashflowcasino.com/frvip/particles-2.webp" alt="Particles"
        class="absolute inset-0 w-2/3 h-full left-[14%]  object-contain mix-blend-screen opacity-50 animate-spin-slow">

      <div class="absolute mb-12 inset-0 flex items-center justify-center">
        <img src="https://images.cashflowcasino.com/frvip/blocked.webp" alt="Content Locked"
          class="w-2/5 animate-hover">
      </div>
      <div class="relative inline-block  mb-4">
        <!-- <div class="absolute -inset-2 bg-[#6258F7] blur-xl opacity-50 rounded-full"></div>
        <img src="https://images.cashflowcasino.com/frvip/blocked.webp" alt="Lock Icon" class="relative w-[88px] h-[88px]">
      </div> -->
        <h3 class="text-6xl font-bold ocanoca text-gold" style="color: gold">
          Bronze
        </h3>
        <p class="text-lg text-gray-400">
          Level 1
        </p>
        <div class="mt-12 grid grid-cols-4 gap-2" style="margin-top: 240px;">
          <div class="flex flex-col items-center">
            <img src="https://images.cashflowcasino.com/frvip/wheel-bronze.webp" alt="Coins Icon"
              class="w-10 h-10 mb-1">
            <p class="text-xs text-gray-300">
              up to
            </p>
            <p class="text-sm font-semibold text-white">
              $ 5.00
            </p>
          </div>
          <div class="flex flex-col items-center">
            <img src="https://images.cashflowcasino.com/frvip/spin.webp" alt="Clover Icon" class="w-10 h-10 mb-1">
            <p class="text-xs text-gray-300">
              Lucky
            </p>
            <p class="text-sm font-semibold text-white">
              Spin
            </p>
          </div>
          <div class="flex flex-col items-center">
            <img src="https://images.cashflowcasino.com/frvip/offers.webp" alt="Gift Box Icon" class="w-10 h-10 mb-1">
            <p class="text-xs text-gray-300">
              Exclusive
            </p>
            <p class="text-sm font-semibold text-white">
              Offers
            </p>
          </div>
          <div class="flex flex-col items-center">
            <div class="relative">
              <img src="https://images.cashflowcasino.com/frvip/playback.webp" alt="Percent Icon"
                class="w-10 h-10 mb-1">
              <span
                class="absolute top-0 right-0 text-[10px] font-bold bg-green-500 text-white rounded-full px-1">5%</span>
            </div>
            <p class="text-xs text-gray-300">
              Daily
            </p>
            <p class="text-sm font-semibold text-white">
              PlayBack
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Keyframe animation to make the lock gently hover up and down.
  It moves 4% up and 4% down from its starting position.
*/
@keyframes hover {

  0%,
  100% {
    transform: translateY(-4%);
  }

  50% {
    transform: translateY(4%);
  }
}

/* A custom slow-spin animation for the second particle effect.
  It takes 25 seconds to complete a full rotation.
*/
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Applying the animations to our custom classes */
.animate-hover {
  animation: hover 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 25s linear infinite;
}
</style>
