<script setup lang="ts">

// onUnmounted is used; keep it imported. Silence ESLint false positive by referencing it deliberately.
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import StarBurst from './StarBurst.vue'
import GameCard from './GameCard.vue'
import { getGameImageUrl } from '@/lib/imageUrl'
import { useGameImageLoader } from '@/composables/useGameImageLoader'
import SpriteAnimator from './SpriteAnimator.vue'
import router from '@/router'
import { Game } from '@/gen/models'
// import { buildFastLocalGames } from '@/components/games/useFastGames'
   const gameStore = useGameStore()

interface LocalGame extends Omit<Game, 'id'> {
  id: string | number;
  temperature: 'hot' | 'cold' | 'none';
  featured?: boolean;
  developer: string;
}

// Optional prop to allow parent-driven lists (e.g., filtered)
const props = defineProps<{
  games?: Array<Partial<Game> & { id: string | number }>
}>()
const imageState = ref<string>('')
// Internal list; defaults to store but can follow prop when provided
const gameList = ref<LocalGame[]>([])

// Export critical assets for above-the-fold (first two visible game cards on typical mobile)
// The actual URLs depend on game data; we provide a static fallback banner so cards render cleanly.
// Note: currently unused locally; kept for potential external use. Disable lint warning.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function getGameCarouselAboveTheFoldAssets(): PreloadManifest {
//   return {
//     images: [
//       { url: '/images/games/tall-field.avif', critical: true },
//       { url: '/images/games/featured.webp', critical: false },
//     ],
//   }
// }

/**
 * Normalizer to LocalGame for both store and prop sources
 */
type PartialGameWithId = Partial<Game> & { id: string | number }

/**
 * Normalize arbitrary Game-like input into LocalGame safely without using any.
 * We coerce and provide sane defaults.
 */
function toLocal(list: Array<PartialGameWithId>): LocalGame[] {
  return list.map((game) => {
    const title =
      (typeof game.title === 'string' && game.title) ||
      (typeof (game as { name?: unknown }).name === 'string' && (game as { name?: string }).name) ||
      'Untitled Game'

    const category =
      (typeof game.category === 'string' && game.category) || 'other'

    const tagsInput = (game as { tags?: unknown }).tags
    const tags = Array.isArray(tagsInput) ? tagsInput as string[] : []

    const isActive =
      typeof (game as { isActive?: unknown }).isActive === 'boolean'
        ? (game as { isActive?: boolean }).isActive
        : true

    const developerRaw = (game as { developer?: unknown }).developer
    const developer =
      typeof developerRaw === 'string' ? developerRaw.toLowerCase() : String(developerRaw ?? '').toLowerCase()

    return {
      ...(game as Record<string, unknown>),
      id: game.id,
      temperature: 'none',
      featured: false,
      title,
      category,
      tags,
      isActive,
      developer,
    } as LocalGame
  })
}

/**
 * Fast-loading local games first:
 * - If parent provides games prop, merge with local fast games and de-duplicate by id with locals first.
 * - Otherwise, use only local fast games for instant render.
 */
function dedupeByIdPreferFirst(list: LocalGame[]): LocalGame[] {
  const seen = new Set<string>()
  const out: LocalGame[] = []
  for (const g of list) {
    const id = String(g.id)
    if (!seen.has(id)) {
      seen.add(id)
      out.push(g)
    }
  }
  return out
}

watch(
  () => [props.games],
  () => {
    const localFast = toLocal(buildFastLocalGames() as unknown as PartialGameWithId[])
    if (props.games && props.games.length) {
      const incoming = toLocal(props.games as PartialGameWithId[])
      // Ensure local fast games appear first
      gameList.value = dedupeByIdPreferFirst([...localFast, ...incoming])
    } else {
      gameList.value = localFast
    }
    // Whenever the list changes, ensure lazy observers and background prefetch are aligned.
    // Defer slightly so DOM reflects the new list before observing.
    requestAnimationFrame(() => {
      if (!isAlive) { return }
      try { setupLazyLoading() } catch { }
    })
  },
  { immediate: true, deep: true }
)

// Reference onUnmounted to satisfy ESLint that it is used indirectly via registered hook below.
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-unused-vars */
// Alive flag to guard async/observer callbacks after unmount
let isAlive = true
onUnmounted(() => {
  isAlive = false
})

// Selection state for center-and-grow interaction
const selectedGameId = ref<string | null>(null)

const carousel = ref<HTMLElement | null>(null)
const customScrollbar = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)
const animatingGameId = ref<string | null>(null)

// Image loader composable state
const {
  loaded,
  preload,
  getState,
  getBackgroundStyle,
} = useGameImageLoader()

// Removed LogoShineJson usage from template to prevent runtime errors.
// If a specific sprite is desired later, import its JSON and pass proper props.

// --- PERFORMANCE OPTIMIZATION ---
// State to hold calculated dimensions to avoid re-calculating them in scroll/move handlers.
const geometry = ref({
    scrollWidth: 0,
    clientWidth: 0,
    maxScroll: 1,
    trackInnerWidth: 0,
    thumbWidth: 0,
    maxThumbX: 0,
});

/**
 * Calculates and caches expensive layout properties.
 * Should only be called on mount and on window resize.
 */
function updateGeometry() {
    if (!carousel.value || !thumb.value || !customScrollbar.value) { return; }

    const scrollWidth = carousel.value.scrollWidth;
    const clientWidth = carousel.value.clientWidth;
    
    const trackStyle = getComputedStyle(customScrollbar.value);
    const pl = Number.parseFloat(trackStyle.paddingLeft || '0');
    const pr = Number.parseFloat(trackStyle.paddingRight || '0');
    const trackInnerWidth = customScrollbar.value.clientWidth - pl - pr;

    const thumbWidth = Math.min(thumb.value.clientWidth, trackInnerWidth);

    geometry.value = {
        scrollWidth,
        clientWidth,
        maxScroll: Math.max(1, scrollWidth - clientWidth),
        trackInnerWidth,
        thumbWidth,
        maxThumbX: Math.max(0, trackInnerWidth - thumbWidth),
    };
}


function getScrollDistance(): number {
  const screenWidth = window.innerWidth
  if (screenWidth <= 360) {
    return 2 * 140 + 10 + 10
  } else if (screenWidth <= 480) {
    return 2 * 160 + 12 + 12
  } else if (screenWidth <= 768) {
    return 2 * 180 + 12 + 12
  } else {
    return 200
  }
}

/**
 * Sync custom scrollbar thumb position with carousel scrollLeft
 */
function syncThumbWithScroll(): void {
  if (!carousel.value || !thumb.value) { return }
  
  // Use pre-calculated geometry values for performance
  const { maxScroll, maxThumbX } = geometry.value;

  const ratio = maxScroll === 0 ? 0 : (carousel.value.scrollLeft / maxScroll);
  const thumbX = Math.round(ratio * maxThumbX);

  thumb.value.style.transform = `translateX(${thumbX}px)`;
}

/**
 * Handle dragging of the custom scrollbar thumb
 */
let isDragging = false
let dragStartX = 0
let thumbStartX = 0
let trackLeft = 0
let trackPaddingLeft = 0

function onThumbPointerDown(e: PointerEvent): void {
  if (!thumb.value || !customScrollbar.value) { return }
  isDragging = true

  // Compute geometry once at drag start
  const trackRect = customScrollbar.value.getBoundingClientRect();
  const trackStyle = getComputedStyle(customScrollbar.value);
  trackPaddingLeft = Number.parseFloat(trackStyle.paddingLeft || '0');
  trackLeft = trackRect.left;

  const thumbStyle = getComputedStyle(thumb.value);
  const transform = thumbStyle.transform;
  const currentX = (!transform || transform === 'none') ? 0 : new DOMMatrixReadOnly(transform).m41;

  dragStartX = e.clientX - trackLeft - trackPaddingLeft;
  thumbStartX = currentX;

  thumb.value.setPointerCapture(e.pointerId);
  thumb.value.style.transition = 'none';
  e.preventDefault();
}

function onPointerMove(e: PointerEvent): void {
  if (!isDragging || !carousel.value || !thumb.value) { return }

  const { maxThumbX, maxScroll } = geometry.value;
  
  const pointerX = e.clientX - trackLeft - trackPaddingLeft;
  let nextThumbX = pointerX - (dragStartX - thumbStartX);
  nextThumbX = Math.min(maxThumbX, Math.max(0, nextThumbX));

  thumb.value.style.transform = `translateX(${nextThumbX}px)`;

  const ratio = maxThumbX === 0 ? 0 : nextThumbX / maxThumbX;
  carousel.value.scrollLeft = ratio * maxScroll;

  e.preventDefault();
}

function onPointerUp(e: PointerEvent | Event): void {
  if (!isDragging || !thumb.value) { return }
  isDragging = false
  try {
    if (e instanceof PointerEvent) {
      thumb.value.releasePointerCapture(e.pointerId)
    }
  } catch { }
  thumb.value.style.transition = '';
}

/**
 * Clicking on the track should jump the thumb and scroll
 */
function onTrackClick(e: MouseEvent): void {
  if (!customScrollbar.value || !carousel.value || !thumb.value) { return }

  const { trackInnerWidth, thumbWidth, maxThumbX, maxScroll } = geometry.value;
  const rect = customScrollbar.value.getBoundingClientRect();
  const trackStyle = getComputedStyle(customScrollbar.value);
  const pl = Number.parseFloat(trackStyle.paddingLeft || '0');
  const clickX = e.clientX - rect.left;
  const innerX = Math.max(0, Math.min(trackInnerWidth, clickX - pl));

  const targetThumbX = Math.min(maxThumbX, Math.max(0, innerX - thumbWidth / 2));
  
  const ratio = maxThumbX === 0 ? 0 : targetThumbX / maxThumbX;
  carousel.value.scrollLeft = ratio * maxScroll;
  thumb.value.style.transform = `translateX(${Math.round(targetThumbX)}px)`;
}

function scrollLeft(distance?: number): void {
  if (carousel.value) {
    const scrollDistance = distance || getScrollDistance()
    carousel.value.scrollBy({
      left: -scrollDistance,
      behavior: 'smooth',
    })
  }
}

function scrollRight(distance?: number): void {
  if (carousel.value) {
    const scrollDistance = distance || getScrollDistance()
    carousel.value.scrollBy({
      left: scrollDistance,
      behavior: 'smooth',
    })
  }
}

defineExpose({
  scrollLeft,
  scrollRight,
})

async function loadGame(game: LocalGame): Promise<void> {
  console.log('loading game...')
  if (animatingGameId.value !== null) { return } // Prevent clicking during animation

  const gameId = String(game.id)
  if (animatingGameId.value === gameId) { return }

  animatingGameId.value = gameId

  // Ensure image is preloaded for crisp transition
  const imageUrl = getGameImageUrl(game)
  if (imageUrl) {
    preload(gameId, imageUrl)
  }

  await new Promise((resolve) => setTimeout(resolve, 100))
  console.log(game)
  if (game.developer === 'redtiger') {
    router.push(`/games/redtiger?gameName=${game.name}`)
    setTimeout(() => {
      animatingGameId.value = null
    }, 100)
  }
  if (game.developer === 'nolimit') {
    router.push(`/games/nolimit?gameName=${game.name}`)
    setTimeout(() => {
      animatingGameId.value = null
    }, 100)
  }
    if (game.developer === 'kickass') {
    router.push(`/games/kickass?gameName=${game.name}`)
    setTimeout(() => {
      animatingGameId.value = null
    }, 100)
  }
}

let intersectionObserver: IntersectionObserver | null = null

function setupLazyLoading(): void {
  if (intersectionObserver) {
    try { intersectionObserver.disconnect() } catch { }
  }

  const rootEl = carousel.value ?? null

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (!isAlive) { return }
      entries.forEach((entry) => {
        if (!isAlive) { return }
        const targetEl = entry.target as Element | null
        if (!targetEl) { return }

        const gameIdAttr = targetEl.getAttribute('data-game-id') || '0'
        const gameIndex = gameList.value.findIndex((g) => String(g.id) === String(gameIdAttr))
        const game = gameIndex >= 0 ? gameList.value[gameIndex] : undefined

        const isTopTwo = gameIndex > -1 && gameIndex < 2

        if (isTopTwo || entry.isIntersecting || entry.intersectionRatio > 0) {
          if (game) {
            const gid = String(game.id)
            const url = getGameImageUrl(game)
            if (url && !loaded.value.has(gid)) {
              preload(gid, url)
            }
            try { intersectionObserver?.unobserve(targetEl) } catch { }
          }
        }
      })
    },
    {
      root: rootEl,
      rootMargin: '200px',
      threshold: 0,
    }
  )

  const observeAllCards = () => {
    if (!isAlive || !intersectionObserver) { return }
    const cards = document.querySelectorAll('.game-card')
    cards.forEach((card) => {
      try { intersectionObserver?.observe(card) } catch { }
    })
  }

  observeAllCards()
  setTimeout(observeAllCards, 200)
}
onBeforeMount(async ()=>{
 await gameStore.fetchAllGames()
 await gameStore.fetchTopWins()

})

onMounted((): void => {
  setupLazyLoading()

  const reKick = () => {
    if (!isAlive) { return }
    if (gameList.value && gameList.value.length > 0) {
      // kickBackgroundPrefetch()
    }
  }
  setTimeout(reKick, 50)
  setTimeout(reKick, 200)

  const prime = () => {
    gameList.value.slice(0, window.innerWidth <= 768 ? 3 : 6).forEach((game) => {
      const gid = String(game.id)
      const url = getGameImageUrl(game)
      if (url && !loaded.value.has(gid)) {
        preload(gid, url)
      }
    })
    nextTick(() => {
      if (!isAlive) return;
      updateGeometry();
      syncThumbWithScroll();
      const cards = document.querySelectorAll('.game-card')
      cards.forEach((c) => intersectionObserver?.observe(c))
    })
  }
  prime()
  setTimeout(prime, 300)

  if (carousel.value) {
    const localScrollWrapper = () => {
      if (!isAlive) { return }
      handleCarouselScroll()
      syncThumbWithScroll()
    }
    carousel.value.addEventListener('scroll', localScrollWrapper)
      ; (carousel.value as HTMLElement & { _removeScrollWrapper?: () => void })._removeScrollWrapper = () => {
        try { carousel.value?.removeEventListener('scroll', localScrollWrapper) } catch { }
      }
  }

  if (thumb.value) {
    thumb.value.addEventListener('pointerdown', onThumbPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp, { passive: false })
    window.addEventListener('pointercancel', onPointerUp, { passive: false })
    window.addEventListener('blur', onPointerUp, { passive: false })
  }

  if (customScrollbar.value) {
    customScrollbar.value.addEventListener('click', onTrackClick)
  }

  const onResize = () => {
    if (!isAlive) { return }
    updateGeometry();
    syncThumbWithScroll();
    const cards = document.querySelectorAll('.game-card')
    cards.forEach((c) => {
      try { intersectionObserver?.observe(c) } catch { }
    })
  }
  window.addEventListener('resize', onResize)

    ; (window as Window & { _gameCarouselCleanup?: () => void })._gameCarouselCleanup = () => {
      try { window.removeEventListener('pointermove', onPointerMove as EventListener) } catch { }
      try { window.removeEventListener('pointerup', onPointerUp as EventListener) } catch { }
      try { window.removeEventListener('pointercancel', onPointerUp as EventListener) } catch { }
      try { window.removeEventListener('blur', onPointerUp as EventListener) } catch { }
      try { window.removeEventListener('resize', onResize as EventListener) } catch { }
      try { customScrollbar.value?.removeEventListener('click', onTrackClick as EventListener) } catch { }
      try { (carousel.value as HTMLElement & { _removeScrollWrapper?: () => void })?._removeScrollWrapper?.() } catch { }
      try { intersectionObserver?.disconnect() } catch { }
    }
})


function handleCarouselScroll(): void {
  if (!carousel.value) { return }

  const sLeft = carousel.value.scrollLeft
  const containerWidth = carousel.value.offsetWidth
  const sRight = sLeft + containerWidth

  gameList.value.forEach((game, index) => {
    const gid = String(game.id)
    if (!loaded.value.has(gid)) {
      const cardWidth = window.innerWidth <= 768 ? 180 : 200
      const gap = 15
      const cardPosition = index * (cardWidth + gap)

      if (cardPosition >= sLeft - 600 && cardPosition <= sRight + 600) {
        const url = getGameImageUrl(game)
        if (url) { preload(gid, url) }
      }
    }
  })
}


/* Image error handler removed; image rendering is now handled by GameCard and composable-driven background styles */

const isFeatured = (game: LocalGame): boolean => Boolean(game.featured)
</script>

<template>
  <div class="carousel-container  bungee align-center relative flex flex-col items-center justify-start">
    <div id="carousel" ref="carousel" class="carousel-scroll-area">
      <div class="carousel-track">
        <div v-for="game in gameList" :key="game.name" :data-game-id="game.id"
          class="game-card animate__animated animate__fadeIn" :class="{
            'theme-cold': game.temperature === 'cold',
            'theme-hot': game.temperature === 'hot',
            'is-selected': selectedGameId === String(game.id),
            'is-fading-out': selectedGameId !== null && selectedGameId !== String(game.id),
          }" @click="loadGame(game)">
          <div class="card-content relative flex flex-col pt-5 max-h-[320px]"
            :class="{ 'feat mt-3 flex-col align-bottom': isFeatured(game) }" :style="{
              backgroundImage: `url(${!isFeatured(game)
                ? '/images/games/tall-field-purple.avif'
                : '/images/games/featured.webp'
                })`,
            }" style="background-size: 100% 100%; background-repeat: no-repeat">
            <!-- Per-card image state layer -->
            <div class="relative w-full overflow-hidden media-box">
              <!-- Single conditional chain for overlays -->
              <div v-if="getState(String(game.id)) === 'loading'"
                class="absolute inset-0 z-10 flex items-center justify-center bg-transparent" aria-hidden="true">
                <!-- Safe loading indicator without undefined LogoShineJson -->
                <SpriteAnimator v-if="imageState !== 'error'" 
                  image-url="logo_shine" :width="180" :height="120" 
                  :initial-delay="0" :loop-delay="0" :framerate="30" />
              </div>

              <div v-else-if="getState(String(game.id)) === 'error'"
                class="absolute inset-0 z-10 flex items-center justify-center">
                <img src="/images/logo.png" alt="Game artwork unavailable"
                  class="max-h-full max-w-full object-contain block" decoding="async" loading="lazy">
              </div>

              <!-- Base background layer (success or none) -->
              <div class="absolute inset-0 z-0 pointer-events-none select-none"
                :style="getBackgroundStyle(String(game.id), getGameImageUrl(game), 0.608, { isRedTiger: (game.developer || '').toLowerCase() === 'redtiger' })"
                aria-hidden="true" />
            </div>
            <div :class="isFeatured(game) ? 'card__banner' : 'card__banner'" class="onacona flex min-w-full mt-3 pt-0"
              style="line-height: .8; letter-spacing: 1.2px; color: white; justify-content: center;"
              :style="game.title.length > 12 ? 'font-size: 1rem; letter-spacing: 1px' : 'font-size: 1.1rem'">
              <!-- <img
                v-if="game.temperature === 'cold'"
                src="/images/games/banner.webp"
                alt=""
                class="card__banner-img"
              />
              <img
                v-else-if="game.temperature === 'hot'"
                src="/images/games/banner.webp"
                alt=""
                class="card__banner-img"
              />
              <img
                v-else
                src="/images/games/banner.webp"
                alt=""
                class="card__banner-img"
              /> -->
              <!-- <div
                class="card__banner__text onacona pb-1"
                style="line-height: 1.7; letter-spacing: 1.2px; color: white; z-index:99"
                :style="game.title.length > 16 ? ' top: 2px':'' "
              > -->
              <!-- <span
                  :style="
                    game.title.length > 16 ? 'font-size: .8rem;' : 'font-size: 1rem'
                  "
                >
                  {{ game.title.substring(0, 16) }}
                </span> -->

              <!-- </div> -->
              <!-- Keep AuroraText wrapper inline/static; center the inner text span only -->
              <!-- <AuroraText> -->
              <span class="block mx-auto  text-center onacona"
                style="max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ game.title }}
              </span>
              <!-- </AuroraText> -->
            </div>

            <div :class="isFeatured(game)
              ? 'card-image-container-featured feat box'
              : 'card-image-container'
              " class="absolute top-0 overflow-hidden" style="z-index: 1">
              <div class="game-image-container-with-filler absolute" style="
                  width: 94%;
                  top: 10px;
                  height: 100%;
                  max-height: 260px;
                  padding-top: 0px;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.1) 0%,
                    rgba(0, 0, 0, 0.05) 20%,
                    transparent 30%,
                    transparent 70%,
                    rgba(0, 0, 0, 0.05) 80%,
                    rgba(0, 0, 0, 0.1) 100%
                  );
                  border-radius: 20px;
                  overflow: hidden;
                ">
                <!-- Replace inline background/image block with GameCard for presentational concerns -->
                <GameCard :id="game.id" class="mr-3 md:mr-4"
                  :title="(game as any).title || (game as any).name || 'Untitled Game'" :developer="game.developer"
                  :url="game.name" :image-url="getGameImageUrl(game)"
                  :image-state="getState(String(game.id))" :background-style="getBackgroundStyle(
                    String(game.id),
                    getGameImageUrl(game),
                    0.608,
                    { isRedTiger: (game.developer || '').toLowerCase() === 'redtiger' },
                  )" :is-animating="animatingGameId === String(game.id)" :data-game-id="String(game.id)"
                  @select="() => loadGame(game)" />
              </div>
              //
              <!-- <MorphingText class="absolute " style=" bottom: -24px; color: white; font-size: xx-large" :texts="['texts','morph','cool']" /> -->
            </div>
          </div>
          <StarBurst />
        </div>
      </div>
    </div>

    <div class="custom-scrollbar-wrapper">
      <div ref="customScrollbar" class="custom-scrollbar-track" role="scrollbar" aria-controls="carousel"
        aria-orientation="horizontal" tabindex="0">
        <div ref="thumb" class="custom-scrollbar-thumb" aria-label="Scroll games" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  height: 42vh;
  min-height: 360px;
  max-height: 360px;
  /* bump a bit to ensure room for scrollbar */
  width: 100%;
  max-width: 600px;
  margin: 0;
  margin-top: 4px;
  /* was 10px, bring the block higher on the page */
  margin-bottom: 0px;
  /* was 10px */
  position: relative;
  box-sizing: border-box;
}

.carousel-scroll-area {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: calc(100% - 28px);
  /* free space below for custom scrollbar */
  width: 100%;
  max-height: 330px;
  scrollbar-width: none;
  /* Disable smooth so drag-driven updates are stable */
  scroll-behavior: auto;
  padding-bottom: 0px;
  /* ensure content not flush with scrollbar */
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: auto;
}

/* Hide native scrollbar on WebKit */
.carousel-scroll-area::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  display: flex;
  gap: 12px;
  height: 100%;
  max-height: 400px;
  box-sizing: border-box;
  padding-bottom: 0px;
  /* small spacing above the scrollbar */
}

.card-image-container {
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  border-radius: inherit;
  top: 0;
  z-index: 1;
}

.card-image-container-featured {
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  border-radius: inherit;
  top: 20px;
  z-index: 1;
}

.game-image-container-with-filler {
  z-index: 0;
  display: block;
  margin-left: 6px;
  margin-right: 8px;
  border-color: white;
  border-width: 1.5px;
  border-left-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-top-style: solid;
  transition: transform 0.3s ease;
  position: absolute;
}

.game-image {
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  transition: background-image 0.3s ease;
  position: absolute;
}

.game-card {
  flex-shrink: 0;
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  max-height: 330px;
  height: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.game-card.is-selected {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 1000;
  transition: transform 0.5s ease-in-out, top 0.5s ease-in-out, left 0.5s ease-in-out;
}

.game-card.is-fading-out {
  opacity: 0;
  transform: scale(0.8);
}

.card__banner {
  width: 100%;
  position: absolute;
  top: 0%;
  color: black;
  left: 0;
  right: 0;
  transform: scaleY(1.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 110%;
  z-index: 4;
  text-align: center;
}

/* Auto-fit the aurora title as large as possible without overlapping */
.aurora-title {
  /* Start with a large base size that is safe on small screens */
  font-size: clamp(0.9rem, 2.8vw, 1.4rem);
  line-height: 1.05;
}

/* Slightly larger on medium viewports, still clamped to avoid clipping */
@media (min-width: 480px) {
  .aurora-title {
    font-size: clamp(1rem, 2.4vw, 1.6rem);
  }
}

@media (min-width: 768px) {
  .aurora-title {
    font-size: clamp(1.05rem, 2.0vw, 1.7rem);
  }
}

/* Ensure some breathing room to avoid touching borders or the image below */
.card__banner .aurora-title {
  padding-top: 2px;
  /* avoid touching top border area */
  padding-bottom: 2px;
  /* avoid overlapping image gradient below */
}

.card__banner :deep(*) {
  /* Ensure any inner text node or component centers its content */
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.card__banner_feat {
  width: 100%;
  position: absolute;
  top: 9%;
  left: 51%;
  transform: translateX(-51.5%);

  background-size: 100% auto;
  z-index: 4;
}

.card__banner-img {
  display: block;
  width: 100%;
  height: auto;
}

.card__banner__text {
  width: 90%;
  position: relative;
  flex-wrap: nowrap;
  top: 4px;
  font-weight: 800;
  left: 10%;
  padding-left: 7px;
  padding-right: 7px;
  transform: translate(-51%, 0%);
  z-index: 5;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
}

.card-content {
  z-index: 2;
  width: 100%;
  height: 100%;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: inherit;
  top: 0;
}

.bottom-banner {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: transparent;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 8px 8px;
  text-transform: uppercase;
  z-index: 3;
  box-sizing: border-box;
  bottom: 0;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

/* Custom Scrollbar */
.custom-scrollbar-wrapper {
  width: 85%;
  max-width: 600px;
  margin-top: 2px;
  /* was 6px, tighten spacing to bring FilterBar closer */
  display: flex;
  justify-content: center;
}

.custom-scrollbar-track {
  position: relative;
  /* Slightly shorter track to let thumb overlap top/bottom */
  width: calc(100% - 8px);
  min-height: 22px;
  height: 12px;
  background-image: url('/images/common/scroll_bar.png');
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-position: center center;
  cursor: pointer;
  user-select: none;
  touch-action: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 6px;
  padding-right: 6px;
  box-sizing: border-box;
  /* allow thumb to overlap */
  overflow: visible;
  z-index: 0;
}

.custom-scrollbar-thumb {
  position: relative;
  left: 0;
  /* Wider by default but still bounded inside the track’s inner width */
  width: clamp(52px, 18%, 120px);
  /* Make the thumb slightly taller so it overlaps the track */
  height: 22px;
  /* track is 22px */
  /* Raise the thumb slightly so it sits higher on screen while overlapping more above */
  top: 10%;
  transform: translate(0, -60%);
  /* was -50% */
  margin-top: -4px;
  /* was -2px */
  background-image: url('/images/common/scroll_thumb.png');
  background-repeat: no-repeat;
  /* Fill the thumb box completely */
  background-size: 100% 100%;
  background-position: center center;
  cursor: grab;
  user-select: none;
  touch-action: none;
  border-radius: 12px;
  box-sizing: border-box;
  z-index: 1;
}

.custom-scrollbar-thumb:active {
  cursor: grabbing;
}

@media (max-width: 360px) {
  .custom-scrollbar-thumb {
    width: 72px;
  }
}
</style>
