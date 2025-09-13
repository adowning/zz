<script setup lang="ts">
const isReady = ref(false)
const appStore = useAppStore()
appStore.showLoading()



// const authStore = useAuthStore()

onMounted(() => {
  // await authStore.init()
  isReady.value = true
})
</script>

<template>
  <GlobalLoading />
  <div v-if="isReady">
    <router-view />
  </div>
</template>
