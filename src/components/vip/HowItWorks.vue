<script setup lang="ts">
import { HOW_IT_WORKS_STEPS } from './constants'
import StepCard from './StepCard.vue'
</script>

<template>
  <section>
    <h2 class="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
How it works
</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StepCard v-for="step in HOW_IT_WORKS_STEPS" :key="step.step" :step="step" />
    </div>
  </section>
</template>
