<script setup lang="ts">
// import { codeToHtml } from 'shiki'
// import { useConvexQuery } from 'convex-vue'
// const { isDark } = useDark()
// import { useAuthStore } from '@/stores/auth.store'
const isReady = ref(false)
const appStore = useAppStore()
appStore.showLoading()



// const authStore = useAuthStore()

onMounted(() => {
  // await authStore.init()
  isReady.value = true
})
// const { data, suspense } = useConvexQuery(api.myModule.myQuery, { param: 'value' })

// const result = await suspense()
// Now you can use the data or result
// console.log(data)
// console.log(result)
</script>

<template>
  <GlobalLoading />

  <!-- <var-highlighter-provider :highlighter="{ codeToHtml }" :theme="isDark ? 'vitesse-dark' : 'vitesse-light'"> -->
  <div v-if="isReady">
    <router-view />
  </div>
  <!-- </var-highlighter-provider> -->
</template>
