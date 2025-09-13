<template>
  <div class="referrals-page-container fugazone">
    <!-- Stats Card -->
    <div class="bg-card rounded-lg p-4 md:p-6 mb-4">
      <div class="flex flex-col md:flex-row">
        <!-- Left side - Codes and Friends stats -->
        <div class="flex-1 md:w-2/3 mb-4 md:mb-0">
          <div class="flex flex-col md:flex-row justify-between">
            <div class="mb-4 md:mb-0">
              <p class="text-text-secondary text-sm font-semibold">Codes Created</p>
              <p class="text-3xl font-bold">{{ `${codeCount}/${maxCount}` }}</p>
            </div>
            <div>
              <p class="text-text-secondary text-sm font-semibold">Total Friends</p>
              <p class="text-3xl font-bold">{{ totalFriend }}</p>
            </div>
            <hr class="hidden md:block w-px bg-divider h-8 mx-8 my-auto">
          </div>
        </div>

        <!-- Right side - Create button -->
        <div class="flex-1 md:flex-shrink-0">
          <div class="md:ml-8 flex items-center justify-center h-full">
            <button @click="openCreateModal"
              class="w-full md:w-auto px-4 py-2 bg-primary-main text-text-secondary font-semibold rounded hover:bg-primary-dark transition-colors">
              Create New Code
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral Codes Table -->
    <div class="bg-card rounded-lg p-4 md:p-6">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-divider">
              <th class="text-left py-2 px-2 font-semibold">Name</th>
              <th class="text-center py-2 px-2 font-semibold">Code</th>
              <th class="text-center py-2 px-2 font-semibold">Link</th>
              <th class="text-center py-2 px-2 font-semibold">Commission Rate</th>
              <th class="text-center py-2 px-2 font-semibold">Date Created</th>
              <th class="text-right py-2 px-2 font-semibold">Referrals</th>
            </tr>
          </thead>
          <tbody v-if="!isLoading && codes.length > 0">
            <tr v-for="item in codes" :key="item.id" class="border-b border-divider hover:bg-background-layer3">
              <td class="py-3 px-2">{{ item.name || '--' }}</td>
              <td class="text-center py-3 px-2">
                <span>{{ item.code }}</span>
                <button @click="copyCode(item.code)" class="ml-2 p-1 rounded border hover:bg-background-default"
                  title="Copy code">
                  <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                    </path>
                  </svg>
                </button>
              </td>
              <td class="text-center py-3 px-2">
                <span>{{ `https://betthrob.com/?r=p-${item.code}` }}</span>
                <button @click="copyLink(item.code)" class="ml-2 p-1 rounded border hover:bg-background-default"
                  title="Copy link">
                  <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                    </path>
                  </svg>
                </button>
              </td>
              <td class="text-center py-3 px-2">{{ item.commissionRate * 100 }}%</td>
              <td class="text-center py-3 px-2">{{ formatDateTime(item.createdAt) }}</td>
              <td class="text-right py-3 px-2">{{ item.referralCount || 0 }}</td>
            </tr>
          </tbody>
          <tbody v-else-if="isLoading">
            <tr>
              <td colspan="6" class="text-center py-8">
                <div class="flex justify-center">
                  <div class="spinner"></div>
                  <span class="ml-2">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center py-8 text-text-secondary">
                No referral codes found. Create your first code to get started!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Referral Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-card rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Create Referral Code</h3>
          <button @click="closeCreateModal" class="text-text-secondary hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createReferralCode" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Code Name</label>
            <input v-model="codeName" type="text" required
              class="w-full px-3 py-2 bg-background-default rounded border border-divider focus:border-primary-main outline-none"
              placeholder="Enter code name">
          </div>

          <div class="flex gap-4">
            <button @click="closeCreateModal" type="button"
              class="flex-1 px-4 py-2 border border-divider rounded hover:bg-background-layer3 transition-colors">
              Cancel
            </button>
            <button :disabled="!codeName.trim() || isSubmitting" type="submit"
              class="flex-1 px-4 py-2 bg-primary-main text-text-secondary rounded hover:bg-primary-dark transition-colors disabled:opacity-50">
              <span v-if="isSubmitting">
                Creating...
              </span>
              <span v-else>
                Create
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAffiliateStore } from '../../stores/affiliate.store'
import { useSnackbar } from '../../composables/useSnackbar'
import { useCopyToClipboard } from '../../composables/useCopyToClipboard'
import { fDateTime as formatDateTime } from '../../utils/format-time'

// Composables
const { enqueueSnackbar } = useSnackbar()
const { copy } = useCopyToClipboard()

// Stores
const affiliateStore = useAffiliateStore()

// Reactive state
const codeName = ref('')
const showCreateModal = ref(false)
const isSubmitting = ref(false)
const codeCount = ref(0)
const maxCount = ref(0)
const totalFriend = ref(0)
const codes = ref<any[]>([])
const isLoading = ref(false)

// Methods
const openCreateModal = () => {
  showCreateModal.value = true
  codeName.value = ''
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const createReferralCode = async () => {
  if (!codeName.value.trim()) return

  try {
    isSubmitting.value = true
    console.log(affiliateStore.createReferralCode)
    await affiliateStore.createReferralCode(codeName.value.trim())
    enqueueSnackbar('Referral code created successfully!', { variant: 'success' })
    closeCreateModal()
    await loadData()
  } catch (error) {
    console.error('Failed to create referral code:', error)
    enqueueSnackbar('Failed to create referral code', { variant: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

const copyCode = async (code: string) => {
  const success = await copy(`p-${code}`)
  if (success) {
    enqueueSnackbar('Code copied to clipboard!', { variant: 'success' })
  }
}

const copyLink = async (code: string) => {
  const success = await copy(`https://betthrob.com/?r=p-${code}`)
  if (success) {
    enqueueSnackbar('Link copied to clipboard!', { variant: 'success' })
  }
}

const loadData = async () => {
  try {
    isLoading.value = true
    await Promise.all([
      affiliateStore.loadReferralStatus(),
      affiliateStore.loadReferralCodes()
    ])

    codes.value = affiliateStore.referralCodes || []
    totalFriend.value = affiliateStore.referralStatus?.friendCount || 0
    codeCount.value = affiliateStore.referralCodes.length
    maxCount.value = affiliateStore.referralStatus?.referralCount || 0
  } catch (error) {
    console.error('Failed to load data:', error)
    enqueueSnackbar('Failed to load data', { variant: 'error' })
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadData()
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

.spinner {
  border: 2px solid transparent;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>