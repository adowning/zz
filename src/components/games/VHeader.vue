<script lang="ts" setup>
// import { ref } from 'vue'
// import { useTransactionStore } from '@/stores/transaction.store'
// import { BalanceChangeMessage } from '@/composables/useEventManager'
const sparkle = ref(false)


</script>

<template>
    <div class="flex h-full flex-column justify-end ">
        <PlayerAvatar style="z-index: 99; width: 75px" current-exp="1000" :sparkle="sparkle" :max-exp="100" />
    </div>
</template>