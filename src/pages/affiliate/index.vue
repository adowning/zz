<template>
  <div class="min-h-screen" style="background-color: #1a0f3a; font-family: 'FugazOne';">
    <!-- Tab Navigation -->
    <div class="px-1 py-2 max-w-full mx-auto overflow-x-auto">
      <div class="bg-background-card rounded-lg p-1 flex overflow-x-auto min-w-max">
        <!-- <button
          v-for="tab in tabs"
          :key="tab.link"
          :class="activeTab === tab.link
            ? 'bg-white text-black shadow-sm'
            : 'text-text-secondary hover:text-white'"
          class="flex-1 min-w-0 px-3 md:px-6 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap text-left"
          @click="setActiveTab(tab.link)"
        >
          <component :is="tab.icon" class="inline mr-2 w-4 h-4" />
          {{ tab.title }}
        </button> -->
          <MorphingTabs
    :tabs="tabs"
    :active-tab="activeTab"
    @update:active-tab="activeTab = $event"
  />
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-w-full mx-auto px-4 py-4">
      <!-- Dashboard Tab -->
      <DashboardView v-if="activeTab === 'Dashboard'" />
      <ReferralsView v-if="activeTab === 'Dashboard2'" />

      <!-- My Rewards Tab -->
      <RewardView v-else-if="activeTab === 'Rewards'" />

      <!-- Referral Codes & Friends Tab -->
      <ReferralCodesFriendsView v-else-if="activeTab === 'Referrals'" />

      <!-- Rate & Rules Tab -->
      <RateRuleView v-else-if="activeTab === 'Rate'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardView from './DashboardView.vue'
import ReferralsView from './referrals.vue'
import ReferralCodesFriendsView from './ReferralCodesFriendsView.vue'
import RewardView from './RewardView.vue'
import RateRuleView from './RateRuleView.vue'

// Router
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// Icon components (using SVG paths)
const DashboardIcon = () => ({
  setup() {
    return () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      })
    ])
  }
})

const RewardIcon = () => ({
  setup() {
    return () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
      })
    ])
  }
})

const ReferralIcon = () => ({
  setup() {
    return () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      })
    ])
  }
})

const RateIcon = () => ({
  setup() {
    return () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
      })
    ])
  }
})

// Tab configuration
const tabs = ["Dashboard","Dashboard2","Rewards","Referrals","Rate"]
// const tabs = [
//   {
//     icon: DashboardIcon,
//     link: 'dashboard',
//     title: 'Dashboard'
//   },
//   {
//     icon: RewardIcon,
//     link: 'reward',
//     title: 'My Rewards'
//   },
//   {
//     icon: ReferralIcon,
//     link: 'referral-codes-friends',
//     title: 'Referral Codes & Friends'
//   },
//   {
//     icon: RateIcon,
//     link: 'rate-rule',
//     title: 'Rate & Rules'
//   }
// ]

// Reactive state
const activeTab = ref('dashboard')

// Computed
const activeIndex = computed(() =>
  tabs.findIndex(tab => tab.link === activeTab.value)
)

// Methods
const setActiveTab = (tabLink: string) => {
  activeTab.value = tabLink
  
  // router.push({ path: `/affiliate/${tabLink}` })
}

// Lifecycle and watchers
watch(
  () => route.params.tab,
  (newTab) => {
    if (newTab && typeof newTab === 'string') {
      activeTab.value = newTab
    }
  },
  { immediate: true }
)

onMounted(() => {
  // Set initial tab from route params
  const initialTab = route.params.tab as string || 'dashboard'
  if (tabs.some(tab => tab.link === initialTab)) {
    activeTab.value = initialTab
  }
  appStore.hideLoading()

})
</script>

<style scoped>
/* Custom styles can be added here */
</style>