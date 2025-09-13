<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-card rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold">Withdraw Rewards</h3>
        <button @click="close" class="text-text-secondary hover:text-text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <!-- Commission Rewards -->
        <div v-if="commissionAvailable > 0" class="p-4 bg-background-layer3 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">Commission Rewards</span>
            <span class="text-sm font-bold">{{ formatMoney(userCurrency, commissionAvailable) }}</span>
          </div>
          <button @click="withdrawCommission"
            class="w-full py-2 bg-primary-main text-text-secondary rounded hover:bg-primary-dark transition-colors">
            Withdraw Commission
          </button>
        </div>

        <!-- Referral Rewards -->
        <div v-if="referralAvailable > 0" class="p-4 bg-background-layer3 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">Referral Rewards</span>
            <span class="text-sm font-bold">{{ formatMoney(userCurrency, referralAvailable) }}</span>
          </div>
          <button @click="withdrawReferral"
            class="w-full py-2 bg-primary-main text-text-secondary rounded hover:bg-primary-dark transition-colors">
            Withdraw Referral
          </button>
        </div>

        <!-- No rewards available -->
        <div v-if="commissionAvailable === 0 && referralAvailable === 0" class="text-center py-8 text-text-secondary">
          No rewards available to withdraw
        </div>

        <!-- Loading state -->
        <div v-if="isSubmitting" class="text-center py-4">
          <div class="border-2 border-primary-main border-t-transparent rounded-full w-6 h-6 animate-spin mx-auto mb-2"></div>
          <span class="text-sm text-text-secondary">Processing withdrawal...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useAffiliateStore } from '../../stores/affiliate.store'
import { useAuthStore } from '../../stores/auth.store'
import { useSnackbar } from '../../composables/useSnackbar'
import { formatMoney } from '../../utils/format-balance'

// Props
interface Props {
  modelValue: boolean
  commissionAvailable: number
  referralAvailable: number
}

const props = defineProps<Props>()

// Emits
const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Composables
const { enqueueSnackbar } = useSnackbar()
const affiliateStore = useAffiliateStore()
const authStore = useAuthStore()

// Reactive state
const isSubmitting = ref(false)

// Computed
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const userCurrency = computed(() => authStore.user?.currency || 'USD')

// Methods
const close = () => {
  visible.value = false
}

const withdrawCommission = async () => {
  if (props.commissionAvailable <= 0) return

  try {
    isSubmitting.value = true
    await affiliateStore.convertReward(1) // 1 for commission
    enqueueSnackbar('Commission rewards withdrawn successfully!', { variant: 'success' })
    close()
  } catch (error) {
    console.error('Failed to withdraw commission:', error)
    enqueueSnackbar('Failed to withdraw commission rewards', { variant: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

const withdrawReferral = async () => {
  if (props.referralAvailable <= 0) return

  try {
    isSubmitting.value = true
    await affiliateStore.convertReward(2) // 2 for referral
    enqueueSnackbar('Referral rewards withdrawn successfully!', { variant: 'success' })
    close()
  } catch (error) {
    console.error('Failed to withdraw referral:', error)
    enqueueSnackbar('Failed to withdraw referral rewards', { variant: 'error' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>