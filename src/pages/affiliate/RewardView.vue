<template>
  <div class="referrals-page-container fugazone">
    <!-- Rewards Summary Card -->
    <div v-if="user && rewardStatus" class="bg-card rounded-lg p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Commission and Referral Summary -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Commission Available -->
            <div class="space-y-2">
              <p class="text-text-secondary text-sm font-semibold">Commission Rewards</p>
              <div class="flex items-center gap-2">
                <div class="text-2xl font-bold text-success-light">
                  {{ formatMoney('USD', rewardStatus?.commissionAvailable || 0) }}
                </div>
                <span class="text-sm font-semibold text-text-primary">Available</span>
              </div>
              <p class="text-sm text-text-secondary">
                Total Earned: {{ formatMoney('USD', rewardStatus?.commissionReward || 0) }}
              </p>
            </div>

            <!-- Referral Available -->
            <div class="space-y-2">
              <p class="text-text-secondary text-sm font-semibold">Referral Rewards</p>
              <div class="flex items-center gap-2">
                <div class="text-2xl font-bold text-success-light">
                  {{ formatMoney('USD', rewardStatus?.referralAvailable || 0) }}
                </div>
                <span class="text-sm font-semibold text-text-primary">Available</span>
              </div>
              <p class="text-sm text-text-secondary">
                Total Earned: {{ formatMoney('USD', rewardStatus?.referralReward || 0) }}
              </p>
              <!-- Pending Rewards - TODO: Integrate with pending rewards API -->
              <!-- <div v-if="false" class="mt-2">
                <p class="text-xs bg-warning-main/20 text-warning-main px-2 py-1 rounded">
                  Pending: $0
                </p>
              </div> -->
            </div>
          </div>

          <!-- Withdraw Button -->
          <div class="mt-6">
            <button @click="openSwapModal"
              class="px-6 py-3 bg-primary-main text-text-secondary font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
              Withdraw Rewards
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Reward Tables -->
    <div class="bg-card rounded-lg">
      <!-- Tab Navigation -->
      <div class="border-b border-divider">
        <div class="flex">
          <button @click="activeTab = 'commission'" class="px-6 py-3 font-medium border-b-2 transition-colors" :class="activeTab === 'commission'
            ? 'border-primary-main text-primary-main'
            : 'border-transparent text-text-secondary hover:text-text-primary'">
            Commission Details
          </button>
          <button @click="activeTab = 'referral'" class="px-6 py-3 font-medium border-b-2 transition-colors" :class="activeTab === 'referral'
            ? 'border-primary-main text-primary-main'
            : 'border-transparent text-text-secondary hover:text-text-primary'">
            Referral Details
          </button>
        </div>
      </div>

      <!-- Commission Table -->
      <div v-if="activeTab === 'commission'" class="p-6">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse mb-4">
            <thead>
              <tr class="border-b border-divider">
                <th class="text-left py-2 px-2 font-semibold">User</th>
                <th class="text-right py-2 px-2 font-semibold">Rate</th>
                <th class="text-right py-2 px-2 font-semibold">Bet Amount</th>
                <th class="text-right py-2 px-2 font-semibold">Commission</th>
                <th class="text-right py-2 px-2 font-semibold">Currency</th>
                <th class="text-right py-2 px-2 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading" class="border-b border-divider">
                <td colspan="6" class="text-center py-8">
                  <div class="flex justify-center">
                    <div class="border-2 border-primary-main border-t-transparent rounded-full w-6 h-6 animate-spin">
                    </div>
                    <span class="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="!commissionData || !commissionData.length" class="border-b border-divider">
                <td colspan="6" class="text-center py-8 text-text-secondary">
                  No commission data available
                </td>
              </tr>
              <tr v-else v-for="item in commissionData" :key="item.id"
                class="border-b border-divider hover:bg-background-layer3">
                <td class="py-3 px-2">{{ item.user?.username || '--' }}</td>
                <td class="text-right py-3 px-2">{{ item.referralData?.commissionRate || .1 * 100 || 0 }}%</td>
                <td class="text-right py-3 px-2">{{ formatBalance(item.betAmount) }}</td>
                <td class="text-right py-3 px-2">{{ formatBalance(item.commissionAmount) }}</td>
                <td class="text-right py-3 px-2">{{ item.currency }}</td>
                <td class="text-right py-3 px-2">{{ formatDateTime(item.user?.createdAt!) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Referral Table -->
      <div v-if="activeTab === 'referral'" class="p-6">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse mb-4">
            <thead>
              <tr class="border-b border-divider">
                <th class="text-left py-2 px-2 font-semibold">User</th>
                <th class="text-right py-2 px-2 font-semibold">VIP Level</th>
                <th class="text-right py-2 px-2 font-semibold">Earned</th>
                <th class="text-right py-2 px-2 font-semibold">Code</th>
                <th class="text-right py-2 px-2 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading" class="border-b border-divider">
                <td colspan="5" class="text-center py-8">
                  <div class="flex justify-center">
                    <div class="border-2 border-primary-main border-t-transparent rounded-full w-6 h-6 animate-spin">
                    </div>
                    <span class="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="!referralData.length" class="border-b border-divider">
                <td colspan="5" class="text-center py-8 text-text-secondary">
                  No referral data available
                </td>
              </tr>
              <tr v-else v-for="item in referralData" :key="item.id"
                class="border-b border-divider hover:bg-background-layer3">
                <td class="py-3 px-2">{{ item.user?.username || '--' }}</td>
                <td class="text-right py-3 px-2">{{ item.balance?.turnover || 0 }}</td>
                <td class="text-right py-3 px-2">{{ formatBalance(item.wagerAmount || '0') }}</td>
                <td class="text-right py-3 px-2">{{ item.referralData?.code || '--' }}</td>
                <td class="text-right py-3 px-2">{{ formatDateTime(item.user?.createdAt!) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Swap Modal -->
    <SwapModal v-model="showSwapModal" :commission-available="rewardStatus?.commissionAvailable || 0"
      :referral-available="rewardStatus?.referralAvailable || 0" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAffiliateStore } from '../../stores/affiliate.store'
import { useAuthStore } from '../../stores/auth.store'
import { formatMoney, fBalance as formatBalance } from '../../utils/format-balance'
import { fDateTime as formatDateTime } from '../../utils/format-time'
import SwapModal from '../../components/affiliate/SwapModal.vue'

// Stores
const affiliateStore = useAffiliateStore()
const authStore = useAuthStore()

// Reactive State
const activeTab = ref<'commission' | 'referral'>('commission')
const showSwapModal = ref(false)

// Computed Properties
const user = computed(() => authStore.user)
const rewardStatus = computed(() => affiliateStore.rewardStatus)
const isLoading = computed(() => affiliateStore.isLoading)
const commissionData = computed(() => affiliateStore.commissionLog)
const referralData = computed(() => affiliateStore.referralLog)

// Methods
const openSwapModal = () => {
  showSwapModal.value = true
}

// Lifecycle
onMounted(async () => {
  await affiliateStore.loadRewardStatus()
  if (activeTab.value === 'commission') {
    await affiliateStore.loadCommissionLog(1, 10)
  } else {
    await affiliateStore.loadReferralLog(1, 10)
  }
})

// Watch activeTab to load appropriate data
watch(() => activeTab.value, async (newTab) => {
  if (newTab === 'commission') {
    await affiliateStore.loadCommissionLog(1, 10)
  } else {
    await affiliateStore.loadReferralLog(1, 10)
  }
})
</script>

<style scoped>
.referrals-page-container {
  background-color: #1a0f3a;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  padding-top: 2rem;
  padding-bottom: 3rem;
  font-family: 'FugazOne';
}

.referrals-page-container::-webkit-scrollbar {
  width: 4px;
}

.referrals-page-container::-webkit-scrollbar-track {
  background: transparent;
}

.referrals-page-container::-webkit-scrollbar-thumb {
  background: #4a3f7a;
  border-radius: 2px;
}

.referrals-page-container::-webkit-scrollbar-thumb:hover {
  background: #6c5f9d;
}
</style>