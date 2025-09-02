<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80">
    <!-- Main VIP Panel Container -->
    <div class="relative w-full max-w-sm h-[80vh] max-h-[700px] vip-panel-bg p-4 pt-12 pb-10 flex flex-col mt-14">

      <!-- Close Button -->
      <button class="absolute top-0 right-0 z-20 close-button"></button>

      <!-- Header Section: VIP Badge -->
      <div class="absolute -top-14 left-1/2 -translate-x-1/2 w-[80%] h-28 z-10">
        <img src="https://images.cashflowcasino.com/vip/tierUpBadgeRibbon.png" class="w-full h-full object-contain" alt="Tier Ribbon"/>
      </div>

      <!-- Main Content Area -->
      <div class="relative z-0 flex-grow flex flex-col mt-4 space-y-4 min-h-0">

        <!-- Tier Progress Section -->
        <div class="bg-black bg-opacity-40 rounded-xl p-3 border-2 border-purple-400">
          <h2 class="text-center text-xl font-bold text-yellow-300 text-shadow-soft">Reach the next Tier!</h2>
          <div class="relative w-full h-10 mt-2 flex items-center">
            <!-- Sliced Progress Bar Frame -->
            <div class="progress-bar-frame">
              <!-- Progress Bar Fill -->
              <div class="progress-bar-fill" style="width: 50%;"></div>
            </div>
            <!-- Tier Number Badge -->
            <div class="absolute right-0 -mr-2 w-12 h-12 flex items-center justify-center number-badge-bg">
              <span class="font-lilita text-2xl text-white text-shadow-hard" style="transform: translateY(-2px);">2</span>
            </div>
          </div>
          <p class="text-center text-xs text-white mt-2 flex items-center justify-center">
            Earn VIP points by spinning or purchasing!
            <img src="https://images.cashflowcasino.com/vip/infoBtn.png" class="w-4 h-4 ml-1" alt="Info"/>
          </p>
        </div>

        <!-- Tier Benefits Section -->
        <div class="bg-black bg-opacity-40 rounded-xl p-3 border-2 border-purple-400 flex-grow flex flex-col min-h-0">
          <h3 class="text-center text-lg font-bold text-yellow-300 mb-2 text-shadow-soft">Tier 1 Benefits</h3>
          <!-- Scrollable List -->
          <div class="flex-grow overflow-y-auto benefits-scrollbar pr-2">
            <ul class="space-y-2">
              <!-- Loop through benefits data -->
              <template v-for="(benefit, index) in benefits" :key="benefit.name">
                <li class="flex items-center space-x-4">
                  <img :src="benefit.icon" class="w-14 h-14" :alt="benefit.name">
                  <div class="flex-grow">
                    <p class="font-bold text-base">{{ benefit.name }}</p>
                    <p class="font-black text-2xl text-yellow-300 font-lilita tracking-wider">{{ benefit.value }}</p>
                  </div>
                </li>
                <!-- Add divider after each item except the last one -->
                <li v-if="index < benefits.length - 1">
                  <img src="https://images.cashflowcasino.com/vip/vipBenefitsDivider.png" class="w-full h-auto" alt="Divider"/>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Button -->
      <!-- Note: Replicating user's positioning. For centering, you might prefer: `left-1/2 -translate-x-1/2` -->
      <div class="absolute bottom-2 left-8 -translate-x-1/2 w-5/6 h-12 z-10" style="transform: translateY(50%)">
        <button class="w-full h-full awesome-button"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive data for the benefits list
const benefits = ref([
  {
    name: 'Chips & Gold Packages',
    value: '1.75x',
    icon: 'https://images.cashflowcasino.com/vip/vipIcon_PurchaseMultiplier.png'
  },
  {
    name: 'Collection Multiplier',
    value: '3.5x',
    icon: 'https://images.cashflowcasino.com/vip/vipIcon_collectionBonus.png'
  },
  {
    name: 'Daily Spin Bonus',
    value: '2x',
    icon: 'https://images.cashflowcasino.com/vip/vipIcon_dailySpin.png'
  },
  {
    name: 'Hourly VIP Bonus',
    value: '5,000',
    icon: 'https://images.cashflowcasino.com/vip/vipIcon_VipBonus.png'
  },
  {
    name: 'VIP Points Multiplier',
    value: '1.5x',
    icon: 'https://images.cashflowcasino.com/vip/vipIcon_VipPointsMultiplier.png'
  }
]);
</script>

<style scoped>
/* NOTE: In a real Vue project, global styles like font imports should be in your main CSS file or index.html */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Lilita+One&display=swap');

/* Custom styles for the VIP screen */
.font-lilita {
    font-family: 'Lilita One', cursive;
}

/* Main panel background and glow effect */
.vip-panel-bg {
    background-image: url('https://images.cashflowcasino.com/vip/vipBenefitsBG.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    /* box-shadow: 0 0 40px rgba(236, 72, 153, 0.7), 0 0 60px rgba(192, 38, 211, 0.5); */ /* User change: commented out */
    color: white;
}

/* Awesome button styles */
.awesome-button {
    background-image: url('https://images.cashflowcasino.com/vip/vipAwesomeBtn.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.1s ease-in-out, background-image 0.1s;
}

.awesome-button:active {
    background-image: url('https://images.cashflowcasino.com/vip/vipAwesomeBtnPressed.png');
    transform: scale(0.98);
}

/* Custom scrollbar for the benefits list */
.benefits-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.benefits-scrollbar::-webkit-scrollbar-track {
    background: #4c1d95; /* purple-800 */
    border-radius: 10px;
}

.benefits-scrollbar::-webkit-scrollbar-thumb {
    background: #fde047; /* yellow-300 */
    border-radius: 10px;
}

.benefits-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #facc15; /* yellow-400 */
}

/* Text shadow for better readability on complex backgrounds */
.text-shadow-hard {
     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
.text-shadow-soft {
     text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Styles for close button and sliced progress bar */
.close-button {
    background-image: url('https://images.cashflowcasino.com/vip/closeBtnGold.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 42px; /* User change: updated size */
    height: 42px; /* User change: updated size */
    transition: transform 0.1s ease-in-out;
}

/* User change: added active state */
.close-button:active {
    background-image: url('https://images.cashflowcasino.com/vip/closeBtnGold-pressed.png');
    transform: scale(0.98);
}

.progress-bar-frame {
    border-style: solid;
    border-width: 15px; /* Creates space for the border image */
    border-image-source: url('https://images.cashflowcasino.com/vip/vipProgressBarFrame.png');
    border-image-slice: 30 fill; /* Slices the image to prevent end distortion */
    border-image-repeat: stretch;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 2px; /* Adds a small gap between frame and fill */
}

.progress-bar-fill {
    height: 100%;
    border-style: solid;
    border-color: transparent;
    /* Define border width for slicing. 0 for top/bottom, 15px for left/right */
    border-width: 0 15px;
    /* Use border-image to slice the fill image */
    border-image-source: url('https://images.cashflowcasino.com/vip/vipProgressBarFill.png');
    border-image-slice: 0 15 0 15 fill; /* Slice 15px from left/right, use middle to fill */
    border-image-repeat: stretch;
    border-radius: 9999px; /* Ensures the inner fill is rounded */
}

.number-badge-bg {
    background-image: url('https://images.cashflowcasino.com/vip/vipNumberBadge.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
