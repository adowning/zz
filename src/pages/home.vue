<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game.store'

const eventManager = useEventManager()
const selectedFilter = ref<'all' | 'fish' | 'slots'>('all')

const gameStore = useGameStore()
const appStore = useAppStore()
const shopOpen = ref(false)
const target = ref()
const rewardsOpen = ref(false)
const wheelOpen = ref(false)
const hideMain = ref(false)
const leaderBoardOpen = ref(false)
const settingsModal = ref(false)
const hideBars = ref<boolean>(false)

const isSettingsOpen = computed(() => settingsModal.value)

eventManager.on('hideBars', (val) => {
  console.log('hideBars', val)
  hideBars.value = val
})
function setSettingsOpen(v: unknown) {
  settingsModal.value = v === true
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('settings-open', settingsModal.value === true)
  }
}
function handleSettingsModal(value: unknown): void {
  setSettingsOpen(value)
}
eventManager.on('settingsModal', handleSettingsModal)

eventManager.on('hideMain', (val) => {
  console.log(val)
  hideMain.value = val
  if (val === true) {
    target!.value!.classList.add(`animate__animated`, 'animate__fadeOut')
  } else {
    target!.value!.classList.add(`animate__animated`, 'animate__fadeIn')

  }

})
eventManager.on('shopOpen', (val) => {
  console.log(val)
  shopOpen.value = val
})
eventManager.on('rewardsOpen', (val) => {
  rewardsOpen.value = val
})
eventManager.on('wheelOpen', (val) => {
  console.log(val)
  wheelOpen.value = val
})
eventManager.on('leaderBoardOpen', (val) => {
  console.log(val)
  leaderBoardOpen.value = val
})

// export interface List {
//   items: Item[]
//   current: number
//   finished: boolean
//   error: boolean
// }

// const [list, getItems] = apiGetItems.use<List>({
//   value: {
//     items: [],
//     current: 1,
//     error: false,
//     finished: false,
//   },
//   onTransform,
//   onError,
// })

// const [plainList, getPlainItems] = apiGetPlainItems.use<List>({
//   value: {
//     items: [],
//     current: 1,
//     error: false,
//     finished: false,
//   },
//   onTransform,
//   onError,
// })

// const [rowList, getRowItems] = apiGetRowItems.use<List>({
//   value: {
//     items: [],
//     current: 1,
//     error: false,
//     finished: false,
//   },
//   onTransform,
//   onError,
// })

// function onTransform(response: Res<Item[]>, { value }: UseAxleRefs<List>) {
//   if (response.code !== 200) {
//     return {
//       ...value.value,
//       finished: false,
//       error: true,
//     }
//   }

//   return {
//     items: [...value.value.items, ...response.data],
//     current: value.value.current + 1,
//     finished: response.data.length < 10,
//     error: false,
//   }
// }

// function onError(error: Error, { value }: UseAxleRefs<List>) {
//   value.value.error = true
// }

// async function handleRefresh() {
//   const value = { items: [], current: 1, error: false, finished: false }
//   const loaders = {
//     list: getItems,
//     rowList: getRowItems,
//     plainList: getPlainItems,
//   }

//   if (active.value === 'list') {
//     list.value = value
//   }

//   if (active.value === 'rowList') {
//     rowList.value = value
//   }

//   if (active.value === 'plainList') {
//     plainList.value = value
//   }

//   await loaders[active.value as keyof typeof loaders]({ params: { current: 1 } })
//   isRefresh.value = false
// }

// function handleClick() {
//   pushStack('/detail')
// }
const visibleGames = computed(() => {
  const f = selectedFilter.value
  const normalized = (gameStore.games as Array<{ id: string | number; category?: string }>)
    .map(g => ({ ...g, id: String(g.id) }))

  return normalized.filter(g => {
    const c = (g.category ?? '').toLowerCase()
    if (f === 'all') { return c === 'slots' || c === 'fish' }
    const wanted = f === 'fish' ? 'fish' : 'slots'
    return c === wanted
  })
})

function onFilterChange(f: 'all' | 'fish' | 'slots') {
  selectedFilter.value = f
}

onMounted(()=>{
  appStore.hideLoading()
})
</script>

<template>
  <div class="pb-[58px]">
    <div v-if="hideMain === false" ref="target" class="home overflow-hidden h-[100%] max-h-[100%] container justify-between flex flex-col">
      <div style="min-height: 68px" />
      <!-- Reserved vertical space to prevent layout shift when LiveWin mounts -->
      <section class="relative w-full " style="min-height: clamp(72px, 12vw, 120px)"
        aria-label="Recent live wins">
        <!-- Optional lightweight skeleton/placeholder; occupies same height -->
        <div
          class="absolute inset-0 animate-pulse bg-gradient-to-b from-white/5 to-white/0 dark:from-white/10 dark:to-white/0" />
        <LiveWin class="relative" style="border-radius: 9999px;" />
      </section>

      <GameCarousel :games="visibleGames" />
      <FilterBar @filter-changed="onFilterChange" />
      <AdCarousel />
    </div>
    <!-- </var-pull-refresh> -->
    <SettingsView v-if="isSettingsOpen" v-model="settingsModal" />
    <ShopView v-if="shopOpen" />
    <VipRewards v-if="rewardsOpen" />
    <WheelView v-if="wheelOpen" />
    <LeaderBoard v-if="leaderBoardOpen" />
  </div>

  <router-stack-view />
</template>

<route lang="json">{
  "meta": {
    "stacks": [
      "detail",
      "sign-up",
      "settings",
      {
        "name": "sign-in",
        "children": [
          "sign-up",
          "forgot-password"
        ]
      }
    ]
  }
}</route>
