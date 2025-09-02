<script setup lang="ts">
import type { HowItWorksStep } from './types'

defineProps<{
  step: HowItWorksStep;
}>()
</script>

<template>
  <div class="rounded-xl p-3 flex flex-col items-center text-center shadow-md" style="background: #24244e
">
    <div class="flex flex-row justify-between w-full">
          <div class="flex flex-col justify-start items-start align-start">
<p class="font-bold text-md">
{{ step.title }}
</p>
    <p class="text-sm text-gray-400">
Step {{ step.step }}/4
</p>
    </div>
    <div class="flex flex-col justify-start">
    <div class="flex items-center justify-center ">
      <img :src="`https://images.cashflowcasino.com/frvip/${step.icon}.webp`" :alt="step.title" class="w-[64px] h-[64px]">
    </div>
</div>
</div>
  </div>
</template>
