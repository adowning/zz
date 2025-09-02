<script setup lang="ts">
  interface AuroraTextProps {
    className?: string
    colors?: string[]
    speed?: number
  }
  const props = withDefaults(defineProps<AuroraTextProps>(), {
    colors: () => ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'],
    // colors: () => ['#ffff', '#ff9800', '#ffc107', '#ffea00'],
    // colors: () => ['#ffea00', '#ffea00', '#ffff', '#ffea00', '#ffea00'],
    speed: 1,
  })
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${props.colors.join(', ')}, ${props.colors[0]})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animationDuration: `${10 / props.speed}s`,
    fontFamily: 'onacona',
  }
</script>

<template>
  <!-- Keep outer wrapper static; do not rotate/scale the wrapper to avoid layout movement -->
  <!-- Keep wrapper static; prevent transforms on the text node -->
  <span :class="`relative inline-block ${props.className}`" style="transform: none;">
    <span class="sr-only">
      <slot />
    </span>
    <!-- Apply animation only to background-position on an inner element to avoid layout movement -->
    <span
      class="relative bg-[length:200%_auto] bg-clip-text text-transparent"
      :style="gradientStyle"
      aria-hidden="true"
    >
      <span class="aurora-bg-only">
        <slot />
      </span>
    </span>
  </span>
</template>

<style scoped>
  /* Animate only background-position so the text does not move */
  .aurora-bg-only {
    animation: aurora-bg-shift 12s ease-in-out infinite alternate;
    will-change: background-position;
    display: inline-block;
    transform: none !important;
  }

  @keyframes aurora-bg-shift {
    0%   { background-position: 0% 50%; }
    25%  { background-position: 50% 100%; }
    50%  { background-position: 100% 50%; }
    75%  { background-position: 50% 0%; }
    100% { background-position: 0% 50%; }
  }
</style>
