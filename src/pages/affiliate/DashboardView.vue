<template>
  <div class="referrals-page-container fugazone">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-8 gap-4">
        <!-- Main Dashboard Card -->
        <div v-if="user" class="md:col-span-8 ">
          <div class="p-4 rounded-lg bg-card border border-background-layer3 futex-cell text-white">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Left side - Main content -->
              <div class="space-y-4">
                <div class="flex justify-between items-end">
                  <h6 class="text-xl font-bold">
                    Invite Friends
                  </h6>
                </div>

                <div class="space-y-6">
                  <!-- Referral and Commission Rewards -->
                  <div class="flex flex-col md:flex-row">
                    <div class="flex items-center gap-2">
                      <div class="text-3xl font-bold text-primary-main">
                        {{ formatMoney('USD', dashboard.referralReward) }}
                      </div>
                      <span class="text-sm font-semibold text-xs md:text-sm md:w-auto w-full">
                        Referral Rewards
                      </span>
                    </div>

                    <div class="md:px-6 md:py-3">
                      <div class="w-px bg-divider md:block hidden" />
                      <div class="h-px bg-divider md:hidden block my-3" />
                    </div>

                    <div class="flex items-center gap-2">
                      <div class="text-3xl font-bold text-primary-main">
                        {{ dashboard.commissionReward }}%
                      </div>
                      <span class="text-sm font-semibold text-xs md:text-sm md:w-auto w-full">
                        Commission Rewards
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Terms Description -->
                <div class="space-y-6 pl-1">
                  <p class="text-text-secondary text-sm font-semibold">
                    Get rewarded for bringing new players to Cashflow Casino
                  </p>
                </div>

                <!-- Referral Link and Code -->
                <div class="flex flex-col md:flex-row gap-4 md:gap-4 my-8">
                  <!-- Referral Link -->
                  <div class="flex-1 w-full md:w-auto">
                    <p class="text-sm font-bold text-text-secondary mb-2">Referral Link</p>
                    <div class="flex items-center justify-between rounded py-2 pl-2 bg-background-default">
                      <p class="text-sm break-words">{{ reward?.code ? shareLink : 'No referral code available' }}</p>
                      <button class="p-2 bg-primary-main rounded hover:bg-primary-dark" @click="copyShareLink()">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                          </path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Referral Code -->
                  <div class="flex-1 w-full md:w-auto">
                    <p class="text-sm font-bold text-text-secondary mb-2">Referral Code</p>
                    <div class="flex items-center justify-between rounded py-2 pl-2 bg-background-default">
                      <p class="text-sm">{{ reward?.code || '' }}</p>
                      <button class="p-2 bg-primary-main rounded hover:bg-primary-dark" @click="copyCode()">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                          </path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Terms description for mobile -->
                <div class="block md:hidden space-y-1 mb-2">
                  <p class="text-text-secondary text-sm">
                    Terms and Conditions apply. See full details for eligibility and payment schedule.
                  </p>
                </div>

                <!-- Social Sharing Buttons -->
                <div class="flex flex-col items-center justify-center">
                  <p>Share your referral link</p>
                  <div class="flex items-center gap-2 mt-2">
                    <a target="_blank" :href="`https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareLink)}`"
                      class="p-2 rounded border border-text-secondary hover:bg-background-layer3">
                      <svg class="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>

                    <a target="_blank" :href="`https://twitter.com/share?url=${encodeURIComponent(shareLink)}`"
                      class="p-2 rounded border border-text-secondary hover:bg-background-layer3">
                      <svg class="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>

                    <a target="_blank" :href="`https://t.me/share?url=${encodeURIComponent(shareLink)}`"
                      class="p-2 rounded border border-text-secondary hover:bg-background-layer3">
                      <svg class="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16l-1.66 7.84c-.166.826-.826.968-1.66.6L13.958 14.1l-1.76 1.686c-.194.194-.356.356-.73.356l.26-3.716 6.704-6.048c.292-.26-.066-.404-.404-.134l-8.302 5.228-3.58-1.116c-.778-.244-.792-.778.166-.116l4.192 2.48-.978 6.946c-.156.83-.572.986-1.156.624L7.34 17.318l-3.302-1.02c-.694-.222-.704-.694.146-.986L16.28 6.752c.694-.398.968-.298 1.126-.398z"/>
                      </svg>
                    </a>

                    <a target="_blank" :href="`https://vk.com/share.php?url=${encodeURIComponent(shareLink)}`"
                      class="p-2 rounded border border-text-secondary hover:bg-background-layer3">
                      <svg class="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zM16.286 5.532c.354 0 .644.29.644.643v.239c0 .354-.29.643-.644.643h-.573c-.47 0-.927.184-1.254.512-.156.156-.24.402-.24.64v.603c0 .354-.29.643-.644.643h-.286c-.354 0-.643-.29-.643-.643v-.183c0-1.022-.82-1.851-1.834-1.851h-1.107c-.352 0-.623-.29-.623-.643v-.286c0-.354.271-.643.623-.643h1.107c.895 0 1.624-.738 1.624-1.648v-.21c0-.354.29-.643.643-.643h.204c.354 0 .643.29.643.643v.21c0 .646-.51 1.17-1.14 1.236-.082.006-.164 0-.239.006-.178.006-.354.012-.532.012-.354 0-.643-.152-.854-.366-.194-.2-.288-.47-.288-.756v-.476c0-.354.29-.643.644-.643h.574c.354 0 .643.29.643.643v.464c0 .552.442 1.002.99 1.002.552 0 .994-.45.994-.91v-.048c0-.354.29-.643.644-.643zm-4.006 5.532c.354 0 .644.29.644.643v.807c0 .354-.29.644-.644.644h-.286c-.354 0-.644-.29-.644-.644v-.515c0-.354.29-.643.644-.643h.286zm2.572 0c.354 0 .644.29.644.643v3.033c0 .354-.29.644-.644.644h-.286c-.354 0-.644-.29-.644-.644V11.71c0-.354.29-.644.644-.644h.286zm-5.314 0c.354 0 .644.29.644.643v2.329c0 .354-.29.644-.644.644h-.286c-.354 0-.644-.29-.644-.644v-.807c0-.354.29-.643.644-.643h.286zm4.006 3.641c.354 0 .644.29.644.644v.573c0 .353-.29.643-.644.643h-3.454c-.354 0-.644-.29-.644-.643v-.573c0-.354.29-.644.644-.644h3.454z"/>
                      </svg>
                    </a>

                    <a target="_blank" :href="`https://wa.me/?text=${encodeURIComponent(shareLink)}`"
                      class="p-2 rounded border border-text-secondary hover:bg-background-layer3">
                      <svg class="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.743.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Right side - Stats Cards -->
              <div class="space-y-5">
                <!-- Total Reward Card -->
                <div class="flex h-full">
                  <div class="flex-1 flex flex-col justify-center items-center space-y-2">
                    <svg class="w-12 h-12 text-primary-main" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M18.32 8H5.67l-.44-4h12.54M12 2l1-2h-4c-1.1 0-2 .9-2 2v1h6V2h2v1h.17c.26 0 .5.11.68.32l.52 5.72A4.98 4.98 0 0 1 14 8h2.68l-.4-4.4-.28-.6M7 10l1.83 8.9c.14.75.76 1.1 1.41 1.1h3.52c.65 0 1.27-.35 1.41-1.1L17 10H7z" />
                    </svg>
                    <div class="text-center">
                      <p class="text-text-secondary text-sm">Total Reward</p>
                      <h5 class="text-2xl font-black text-center">
                        {{ formatMoney('USD', totalReward || 0) }}
                      </h5>
                    </div>
                  </div>

                  <div class="h-full w-px bg-divider mx-2 hidden md:block" />

                  <!-- Total Friends Card -->
                  <div class="flex-1 flex flex-col justify-center items-center space-y-2">
                    <svg class="w-12 h-12 text-primary-main" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 5.5A3.5 3.5 0 0 1 8.5 9a3.5 3.5 0 0 1 3.5-3.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5zM5.5 8c.98 0 1.83.45 2.39 1.14A6.474 6.474 0 0 0 7 13.5v.5c0 1.38.56 2.63 1.46 3.54A5.487 5.487 0 0 1 1 17.5a5.5 5.5 0 0 1 4.5-5.32V8zm13 0v1.18A5.5 5.5 0 0 1 23 17.5a5.487 5.487 0 0 1-7.46 3.04A6.503 6.503 0 0 0 17 14v-.5a6.474 6.474 0 0 0-.11-1.36c.56-.69 1.41-1.14 2.39-1.14zM12 14a6.5 6.5 0 0 1 6.5-6.5h.01A8.44 8.44 0 0 0 9 13.5v.5c0 1.38.56 2.63 1.46 3.54A5.487 5.487 0 0 1 1 17.5a5.5 5.5 0 0 1 4.5-5.32V8c0 .98.45 1.83 1.14 2.39A8.44 8.44 0 0 0 9 13.5v.5c0 1.38.56 2.63 1.46 3.54A5.487 5.487 0 0 1 3 17.5a5.5 5.5 0 0 1 4.5-5.32V8c0 .98.45 1.83 1.14 2.39A8.44 8.44 0 0 0 9 13.5v.5c0 1.38.56 2.63 1.46 3.54A5.487 5.487 0 0 1 1 17.5a5.5 5.5 0 0 1 4.5-5.32V8z" />
                    </svg>
                    <div class="text-center">
                      <p class="text-text-secondary text-sm">Total Friends</p>
                      <h5 class="text-2xl font-black text-center">
                        {{ reward?.friends || 0 }}
                      </h5>
                    </div>
                  </div>
                </div>

                <!-- Referral and Commission Rewards Cards -->
                <div class="flex">
                  <!-- Referral Rewards -->
                  <div class="flex-1 flex flex-col justify-center items-center space-y-2">
                    <svg class="w-12 h-12 text-primary-main" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <div class="text-center">
                      <p class="text-text-secondary text-sm">Referral Rewards</p>
                      <h5 class="text-2xl font-black text-center">
                        {{ formatMoney('USD', reward?.totalReferralAmount || 0) }}
                      </h5>
                    </div>
                  </div>

                  <div class="h-full w-px bg-divider mx-2 hidden md:block" />

                  <!-- Commission Rewards -->
                  <div class="flex-1 flex flex-col justify-center items-center space-y-2">
                    <svg class="w-12 h-12 text-primary-main" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M5 6h14v2H5V6zm14 5.96V11H5v1.06c0 1.54.25 2.38.75 2.38s.75-.84.75-2.38V12h11v.96c0 1.54.25 2.38.75 2.38s.75-.84.75-2.38zM5 19v-5h14v5H5z" />
                    </svg>
                    <div class="text-center">
                      <p class="text-text-secondary text-sm">Commission Rewards</p>
                      <h5 class="text-2xl font-black text-center">
                        {{ formatMoney('USD', reward?.totalCommissionAmount || 0) }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activities Table -->
      <div class="p-4 rounded-lg bg-card mt-4 border border-background-layer3">
        <h6 class="text-xl font-bold mb-4">
          Activities
        </h6>

        <div v-if="isLoading" class="text-center py-8">
          <div class="text-text-secondary">Loading activities...</div>
        </div>
        <div v-else-if="!referralCodes?.length" class="text-center py-8 text-text-secondary">
          No activities available
        </div>
        <table v-else class="w-full text-left">
          <thead class="border-b border-divider">
            <tr>
              <th v-for="header in activityHeaders" :key="header.key" class="py-3 px-4 font-semibold text-sm"
                :style="{ width: header.width }">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in referralCodes" :key="item.id" class="border-b border-divider hover:bg-background-layer3">
              <td class="py-3 px-4">{{ item.name || '--' }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  {{ item.code }}
                  <button @click="copyCode(item.code)"
                    class="p-1 rounded border border-text-secondary hover:bg-background-layer3">
                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                      </path>
                    </svg>
                  </button>
                </div>
              </td>
              <td class="py-3 px-4 text-right">{{ item.referralCount || 0 }}</td>
              <td class="py-3 px-4 text-right">$0</td>
              <td class="py-3 px-4 text-right">$0</td>
              <td class="py-3 px-4 text-right">{{ formatDateTime(item.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- FAQ Section -->
      <div class="p-4 rounded-lg bg-card mt-4 border border-background-layer3">
        <h6 class="text-xl font-bold mb-4">
          Frequently Asked Questions
        </h6>

        <div v-for="(faq, index) in referralFaq" :key="index" class="border-b border-divider last:border-b-0">
          <div class="flex justify-between items-center py-2">
            <p class="font-bold">{{ faq.title }}</p>
            <button @click="toggleFaq(index)" class="p-2">
              <svg class="w-4 h-4 text-text-secondary transition-transform duration-200"
                :class="{ 'rotate-180': activeFaq === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>

          <div v-if="activeFaq === index" class="mb-2 transition-all duration-300 ease-in-out">
            <p>{{ faq.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAffiliateStore } from '../../stores/affiliate.store'
import { useAuthStore } from '../../stores/auth.store'
import { useSnackbar } from '../../composables/useSnackbar'
import { useCopyToClipboard } from '../../composables/useCopyToClipboard'
import { formatMoney } from '../../utils/format-balance'
import { fDateTime as formatDateTime } from '../../utils/format-time'
// import type { ReferralHQItem } from '../../types/affiliate'

// Composables
const { enqueueSnackbar } = useSnackbar()
const { copy } = useCopyToClipboard()

// Stores
const affiliateStore = useAffiliateStore()
const authStore = useAuthStore()

// Reactive state
const activeFaq = ref(-1)

// Computed properties
const user = computed(() => authStore.user)
const reward = computed(() => affiliateStore.rewardData)
const referralCodes = computed(() => affiliateStore.referralCodes)
const isLoading = computed(() => affiliateStore.isLoading)
const referralFaq = ref([
  { title: 'How does the referral system work?', content: 'When someone signs up using your referral link or code, they become your referral. You earn commissions from their gaming activity.' },
  { title: 'When do I get paid?', content: 'Commissions are calculated weekly and become available for withdrawal after the required wagering period.' },
  { title: 'What are the commission rates?', content: 'Commission rates vary based on your VIP level. Higher VIP tiers receive higher commission percentages.' },
  { title: 'Are there any restrictions?', content: 'Referral earnings are subject to fair play terms and standard casino conditions.' }
])

// Dashboard static data
const dashboard = ref({
  referralReward: 1000,
  commissionReward: 25
})

const activityHeaders = [
  { title: 'Name', key: 'name', width: '15%' },
  { title: 'Code', key: 'code', width: '20%' },
  { title: 'Total Referrals', key: 'totalReferrals', width: '15%', align: 'right' },
  { title: 'Referrals', key: 'referralCount', width: '15%', align: 'right' },
  { title: 'Commission', key: 'totalCommission', width: '15%', align: 'right' },
  { title: 'Total Rewards', key: 'totalRewards', width: '15%', align: 'right' },
  { title: 'Created At', key: 'createdAt', width: '20%', align: 'right' }
]

// Computed
const shareLink = computed(() => affiliateStore.shareLink || '')
const totalReward = computed(() =>
  Number(reward.value?.totalCommissionAmount || 0) + Number(reward.value?.totalReferralAmount || 0)
)

// Methods
const copyShareLink = async () => {
  if (shareLink.value) {
    const success = await copy(shareLink.value)
    if (success) {
      enqueueSnackbar('Link copied to clipboard!', { variant: 'success' })
    }
  }
}

const copyCode = async (code?: string) => {
  const codeToCopy = code || reward.value.code
  if (codeToCopy) {
    const success = await copy(`p-${codeToCopy}`)
    if (success) {
      enqueueSnackbar('Code copied to clipboard!', { variant: 'success' })
    }
  }
}

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}

// Lifecycle
onMounted(async () => {
  try {
    await affiliateStore.loadData()
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    enqueueSnackbar('Failed to load dashboard data', { variant: 'error' })
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