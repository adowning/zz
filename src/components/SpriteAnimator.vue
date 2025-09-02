<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed, nextTick } from 'vue'

const URL_PREFIX = 'https://gameui.cashflowcasino.com/anim/'
// const LOCAL_PREFIX = 'https://gameui.cashflowcasino.com/anim/'
// ------------- Props ---------------------------------------
const props = defineProps<{
  /** URL pointing to the animation JSON file located under https://gameui.cashflowcasino.com/anim/** */
  // animationData: string
  imageUrl: string
  width: number
  height: number
  framerate?: number
  initialDelay?: number
  loopDelay?: number
}>()

// ------------- State ---------------------------------------
const canvasRef = ref<HTMLCanvasElement | null>(null)
const image = new Image()
const frameIndex = ref(0)
const startTimeoutId = ref<NodeJS.Timeout | null>(null)
const loopTimeoutId = ref<NodeJS.Timeout | null>(null)
const imageLoaded = ref(false)
let lastFrameTime = 0
let animationFrameId = 0

// Animation data fetched from the provided URL
const animationData = ref<{
  frames: {
    frame: { x: number; y: number; w: number; h: number }
    rotated: boolean
    trimmed?: boolean
    spriteSourceSize: { x: number; y: number; w: number; h: number }
    sourceSize: { w: number; h: number }
  }[]
} | null>(null)

const frameList = computed(() => animationData.value?.frames ?? [])

// ------------- Helpers -------------------------------------
async function loadAnimation() {
  try {
    const res = await fetch(`/images/anim/${props.imageUrl.replace('_sheet', '')}.json`, { mode: 'cors' })
    if (!res.ok) throw new Error(`Failed to load animation: ${res.status}`)
    const data = await res.json()
    animationData.value = data
    startAnimationCycle()
  } catch (e) {
    console.error('Animation load error', e)
  }
}

function drawFrame(index: number) {
  const canvas = canvasRef.value
  if (!canvas || !image.complete || image.naturalHeight === 0) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const currentFrame = frameList.value[index]
  if (!currentFrame) return

  const { frame, sourceSize, spriteSourceSize } = currentFrame
  const scale = Math.min(props.width / sourceSize.w, props.height / sourceSize.h)
  const targetWidth = spriteSourceSize.w * scale
  const targetHeight = spriteSourceSize.h * scale
  const destX = spriteSourceSize.x * scale
  const destY = spriteSourceSize.y * scale

  ctx.clearRect(0, 0, props.width, props.height)
  ctx.save()
  ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, destX, destY, targetWidth, targetHeight)
  ctx.restore()
}

function animate(timestamp: number) {
  const fps = props.framerate ?? 60
  const frameInterval = 1000 / (fps > 0 ? fps : 60)
  if (!lastFrameTime) lastFrameTime = timestamp
  const deltaTime = timestamp - lastFrameTime

  if (deltaTime > frameInterval) {
    lastFrameTime = timestamp - (deltaTime % frameInterval)
    drawFrame(frameIndex.value)
    frameIndex.value++

    if (frameIndex.value >= frameList.value.length) {
      frameIndex.value = 0
      if (props.loopDelay && props.loopDelay > 0) {
        cancelAnimationFrame(animationFrameId)
        loopTimeoutId.value = setTimeout(() => {
          lastFrameTime = 0
          animationFrameId = requestAnimationFrame(animate)
        }, props.loopDelay * 1000)
        return
      }
    }
  }
  animationFrameId = requestAnimationFrame(animate)
}

function startAnimationCycle() {
  cancelAnimationFrame(animationFrameId)
  if (startTimeoutId.value) clearTimeout(startTimeoutId.value)
  if (loopTimeoutId.value) clearTimeout(loopTimeoutId.value)

  startTimeoutId.value = setTimeout(() => {
    // FIX: Set imageLoaded to true just before the first frame is drawn.
    // This ensures the placeholder stays visible during the initial delay.
    imageLoaded.value = true
    frameIndex.value = 0
    lastFrameTime = 0
    animationFrameId = requestAnimationFrame(animate)
  }, props.initialDelay? props.initialDelay * 1000 : 2000)
}

// ----------------------------------------------------------------
onMounted(() => {
  // Set the onload handler once. This will be used for the initial load and all subsequent loads.
  image.onload = () => {
    // FIX: Do not set imageLoaded here. Let startAnimationCycle handle it.
    loadAnimation()
  }
  
  // Use nextTick to ensure the placeholder has rendered before we start loading the image.
  // This prevents a race condition where a cached image loads instantly.
  nextTick(() => {
    // image.src = `${URL_PREFIX}${props.imageUrl}.avif`
    image.src = `/images/anim/${props.imageUrl}.avif`
  });
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  if (startTimeoutId.value) clearTimeout(startTimeoutId.value)
  if (loopTimeoutId.value) clearTimeout(loopTimeoutId.value)
})

// Watch for changes in the imageUrl prop to load a new animation
watch(() => props.imageUrl, (newUrl) => {
  if (!newUrl) return;

  // 1. Reset the state to show the placeholder for the new image
  imageLoaded.value = false;
  cancelAnimationFrame(animationFrameId);
  if (startTimeoutId.value) clearTimeout(startTimeoutId.value);
  if (loopTimeoutId.value) clearTimeout(loopTimeoutId.value);
  frameIndex.value = 0;
  lastFrameTime = 0;
  animationData.value = null;

  // 2. Wait for the DOM to update (to show the placeholder), then start loading the new image.
  // The onload handler set in onMounted will take care of the rest.
  nextTick(() => {
    image.src = `${URL_PREFIX}${newUrl}.png`;
  });
}, { immediate: false }) // 'immediate: false' ensures it doesn't run on initial mount

</script>

<template>
  <canvas  ref="canvasRef" :width="width" :height="height" />
  <!-- <img v-show="!imageLoaded" :src="`/images/placeholders/${imageUrl}.avif`" /> -->
</template>
