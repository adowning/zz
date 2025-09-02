<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import LiveWinItem from './LiveWinItem.vue'

interface SourceWinner {
  id: string;
  playerName?: string;
  gamesName?: string;
  gameName?: string;
  grossWinAmount: number;
  winAmount?: number;
  playerAvatar: string
}

const gameStore = useGameStore()


// --- REFS ---
// Create a ref to hold the DOM element for the marquee content
const marqueeContent = ref<HTMLElement | null>(null)

// --- MOCK DATA ---
// This would typically come from a store (like Pinia) or an API call.

let x = 0;
const mappedWinners = computed(() =>
  (gameStore.topWins as ReadonlyArray<SourceWinner>).map((item) => {
    // Use a narrowed local variable to avoid optional chaining on a union
    const resolvedGameName: string = (item.gameName ?? item.gamesName ?? '').toLowerCase()
    const rawAmount: number = (item.grossWinAmount ?? item.grossWinAmount) ?? 0
    return {
      id: x++,
      imageUrl: `https://images.cashflowcasino.com/all/${resolvedGameName}.avif`,
      gameName: item.gameName ?? item.gamesName,
      name: item.playerName,
      amount: String(rawAmount),
      location: 'Anytown, USA',
      playerAvatar: item.playerAvatar
    }
  }),
)

// --- COMPUTED PROPERTIES ---

// 1. Ensure there are enough items for a continuous marquee.
const contentFilledWinners = computed(() => {
  const minItemsToFill = 10;
  const winnersList = mappedWinners.value;
  if (!winnersList.length) { return []; }
  
  const newWinnerList = [];
  while (newWinnerList.length < minItemsToFill) {
    newWinnerList.push(...winnersList);
  }
  return newWinnerList;
});

// 2. Duplicate the list for a seamless scrolling effect.
const displayWinners = computed(() => {
    if (!contentFilledWinners.value.length) {return [];}
    return [...contentFilledWinners.value, ...contentFilledWinners.value]
});


// --- LIFECYCLE HOOKS & ANIMATION ---

let animationFrameId: number;

onMounted(() => {
  if (!marqueeContent.value) {return;}

  let scrollPos = 0;
  let lastTimestamp = 0;
  const scrollSpeed = 40; // pixels per second

  // FIX: Calculate the reset point ONCE before the animation loop starts.
  // This avoids forcing the browser to recalculate layout on every frame.
  const resetPoint = marqueeContent.value.scrollWidth / 2;

  function animateMarquee(timestamp: number) {
    if (!marqueeContent.value) {return;} // Stop if element is gone

    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    scrollPos += scrollSpeed * deltaTime;

    // Use the pre-calculated reset point
    if (scrollPos >= resetPoint) {
      scrollPos -= resetPoint;
    }

    marqueeContent.value.style.transform = `translateX(-${scrollPos}px)`;

    animationFrameId = requestAnimationFrame(animateMarquee);
  }

  // Start the animation loop
  animationFrameId = requestAnimationFrame(animateMarquee);
});

onUnmounted(() => {
  // Ensure we cancel the animation frame when the component is destroyed
  cancelAnimationFrame(animationFrameId);
});

</script>

<template>
  <!-- Reserve height to prevent layout shift -->
  <div class="marquee-reserved w-full">
    <div v-if="displayWinners.length > 0" class="marquee-container w-full max-w-7xl overflow-hidden relative group"
      role="region" aria-label="Recent winning players">
      <ul ref="marqueeContent" class="marquee-content flex list-none m-0 p-0 will-change-transform gap-2">
        <LiveWinItem v-for="(winner, index) in displayWinners" :key="`${winner.id}-${index}`" :winner="winner" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Reserve stable height to avoid pushing content on mount/render */
.marquee-reserved {
  min-height: 70px;
  height: auto;
}

/* Mask edges for a fade-in/out effect */
.marquee-container {
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* The marquee content will be scrolled via JavaScript transform */
.marquee-content {
  display: inline-flex;
  flex-wrap: nowrap;
  will-change: transform;
}
</style>
