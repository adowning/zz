<script setup lang="ts">
import LockedLevelCard from './LockedLevelCard.vue'
import ProgressTracker from './ProgressTracker.vue'
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
    <LockedLevelCard />
    <ProgressTracker />
    </div>
  </section>
</template>
