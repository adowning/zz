<script lang="ts" setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import { BalanceChangeMessage } from '@/composables/useEventManager'
// import { setup } from 'mockjs'

const transactionStore = useTransactionStore()
const vipStore = useVipStore()
const router = useRouter()
const emit = defineEmits<{
  (e: 'settingsModal', value: boolean): void
}>()
const eventBus = useEventManager()
// const router = useRouter()
const countdownActive = ref(false)
const sparkle = ref(false)
// const transactionStore = useTransactionStore()
// const { wallet } = storeToRefs(transactionStore)
const balanceChange = ref<number | null>(null)
const balanceChangeKey = ref(0) // Used to re-trigger the animation
const appStore = useAppStore()
// const transactionStore = useTransactionStore()
// const {
//   getTransactionHistory,
//   // error: authError, // Auth store errors
// } = storeToRefs(transactionStore)

// Use wallet for balance display
// const balance = computed(() => wallet.value?.balance || 0)

function openSettings() {
  console.log('openSettings')
  appStore.modalShown = true
  // Emit on the app-level event bus for same-subtree listeners
  eventBus.emit('settingsModal', true)
  // Also broadcast a global CustomEvent for listeners that live outside the GameLoader subtree (e.g. HomeView)
  try {
    window.dispatchEvent(new CustomEvent('app:settingsModal', { detail: true }))
  } catch { }
  // Emit via Vue component channel (for any parent chain listeners)
  emit('settingsModal', true)
}
// function logout() {
//   console.log('Logout button clicked')
//   const authStore = useAuthStore()
//   try {
//     authStore.logout()
//     console.log('Logout successful')
//   } catch (e) {
//     console.error('Logout failed:', e)
//   }
// }
function goHome() {
  console.log('Logout button clicked')
  router.push('/')
}
const depositItems = ref()

const target = ref()
const remaining_minutes = ref(0)
const remaining_seconds_display = ref(0)

// Format balance with 2 decimal places
function formatBalance(balance: number) {
  if (typeof balance !== 'number') { return balance }
  return balance.toFixed(0)
}
const interval = ref()

// const currentGameSession = computed(() => {
//   return currentUser.value.currentGameSession
// })
function countdownTimer(start_date: Date): void {
  // Calculate the end date, which is one hour after the start date
  const end_date = new Date(start_date.getTime() + 3600000) // One hour later

  // Calculate the difference between the end date and now
  const now = new Date()
  const time_difference = end_date.getTime() - now.getTime()

  // Convert the time difference to seconds
  const total_seconds = Math.floor(time_difference / 1000)

  // Calculate minutes and seconds
  const minutes = Math.floor(total_seconds / 60)
  const seconds = total_seconds % 60

  // Print the initial countdown
  console.log(`Countdown: ${minutes} minutes and ${seconds} seconds`)

  // Start the countdown
  let remaining_seconds = total_seconds
  interval.value = setInterval(() => {
    // Calculate remaining minutes and seconds
    remaining_minutes.value = Math.floor(remaining_seconds / 60)
    remaining_seconds_display.value = remaining_seconds % 60

    // Print the remaining time
    // console.log(
    //   `Countdown: ${remaining_minutes.value} minutes and ${remaining_seconds_display.value} seconds`,
    // )

    // Decrease the remaining seconds by one
    remaining_seconds -= 1

    // Stop the countdown when it reaches zero
    if (remaining_seconds < 0) {
      clearInterval(interval.value)
      console.log('Countdown finished!')
      // console.log(depositItems.value);
      depositItems.value?.splice(0, 3)
    }
  }, 1000)
  countdownActive.value = true
}

// watch(getTransactionHistory, (newVal) => {
//   const pendings = newVal.find((purch: { status: string }) => purch.status === 'PENDING_PAYMENT')
//   if (pendings) {
//     countdownTimer(new Date(pendings.createdAt))
//   }
// })
onBeforeMount(async () => {
  await vipStore.fetchAllVipLevels()
  await vipStore.fetchVipInfo()
  await transactionStore.dispatchOperatorProducts()
  await transactionStore.dispatchUserWallet()
})
onMounted(() => {

  const rtu = useRealtimeUpdates()
  rtu.setupEventListeners()
  // rtu.setupZero()
  eventBus.on(
    'balance:update',
    ((payload: BalanceUpdatePayload) => {
      console.log(`TopBarMobile: balance:update event received with change of ${payload.amount}.`)
      balanceChange.value = payload.amount
      balanceChangeKey.value++ // Increment key to force re-render of animation element

      // Hide the indicator after the animation
      setTimeout(() => {
        balanceChange.value = null
      }, 2000) // Animation duration: 2 seconds
    }) as EventMessage<'balance:update'>,
    'TopBarMobile',
  )
  eventBus.on(
    'balanceChange',
    ((data: BalanceChangeMessage) => {
      console.log(`TopBarMobile: BalanceChangeMessage event received with change of ${JSON.stringify(data)}.`)
      balanceChange.value = data.newBalance - data.oldBalance
      balanceChangeKey.value++ // Increment key to force re-render of animation element

      // Hide the indicator after the animation
      setTimeout(() => {
        balanceChange.value = null
      }, 2000) // Animation durat
    })
  )
  depositItems.value = []
  // console.log(depositItems.value)

  if (depositItems.value !== undefined && depositItems.value.length > 0) {
    depositItems.value.forEach((item: { status: string; createdAt: string | number | Date }) => {
      // console.log(item.status);
      if (item.status === 'PENDING') {
        countdownTimer(new Date(item.createdAt))
      }
    })
  }
})
</script>

<template>
  <!-- Remove entrance slide to avoid whole page dropping in -->
  <div ref="target" class="tbar flex flex-row justify-stretch">
    <div class="flex w-100 flex-row justify-start">
      <!-- <PlayerAvatar @click="router.push('/client/profile')" style="z-index: 99; max-height: 60px" /> -->
      <PlayerAvatar style="z-index: 99; width: 55px" current-exp="1000" :sparkle="sparkle" :max-exp="100" />
      <div id="PlayerCredits" class="color-white flex flex-col pb-1 pl-1 text-center">
        <div v-if="countdownActive" class="flex w-full flex-row items-center" style="
            height: 14px;
            font-size: 16px;
            font-weight: 600;
            line-height: 0.5;
            margin-left: 8px;
            margin-top: 4px;
            color: white;
          ">
          <img src="/images/layout/cashappicon.avif" width="14px" style="margin-right: 7px; color: white" />
          ends:
          {{ remaining_minutes > 1 ? `${remaining_minutes}m` : `0m:${remaining_seconds_display}` }}
        </div>
        <div v-else class="flex w-full flex-row" style="height: 20px; font-size: 26px; font-weight: 600" />
        <div class="glow-light flex flex-row items-center justify-center" style="
            z-index: 999;
            text-align: center;
            min-height: 35px;
            min-width: 120px;
            max-width: 120px;
            font-size: 23px;
            padding-top: 1px;
            padding-left: 6px;
            margin-left: 6px;
            font-weight: 600;
            background-size: cover;
            background-image: url('/images/layout/money_backing.png');
          ">
          <div v-if="transactionStore.wallet" class="glow mt--2 pt-.5 flex justify-center leading-[0.5]"
            style="line-height: 0.8; text-align: center; letter-spacing: 0px; font-weight: 800">
            {{ formatBalance(transactionStore.wallet.balance) }}
          </div>
        </div>
      </div>
    </div>

    <div style="
        height: 50px;
        width: 50px;
        right: 38px;
        position: absolute;
        top: 0px;
        gap: 0px;
        margin: 0px;
        padding: 4px;
        background-size: cover;
        z-index: 999999;
      ">
      <img style="top: 0px; right: 8px; gap: 0px; margin: 0px; padding: 0px; background-size: cover; z-index: 999999"
        src="/images/layout/settings.avif" @click="openSettings" />
    </div>
    <div style="
        height: 50px;
        width: 50px;
        position: absolute;
        top: 0px;
        right: -4px;
        gap: 0px;
        margin: 0px;
        padding: 4px;
        background-size: cover;
        z-index: 999999;
      ">
      <img style="top: 0px; right: 8px; gap: 0px; margin: 0px; padding: 0px; background-size: cover; z-index: 999999"
        src="/images/layout/home.png" @click="goHome()" />
    </div>
    <!-- <div
      class=""
      style="
        position: absolute;
        top: 0px;
        right: 8px;
        gap: 0px;
        margin: 0px;
        padding: 0px;
        background-size: cover;
        z-index: 99;
      "
    >
      <img style="width: 52px; height: 52px" src="@/assets/bars/settings.avif" />
    </div> -->
  </div>
  <!-- </div> -->
</template>

<style scoped>
.tbar {
  background-size: cover;
  z-index: 99;
  position: absolute;
  width: 100%;
  max-height: 62px;

  /* height: 52px; */
  background-position: center;
  top: 0px;
  left: 0px;
  background-repeat: no-repeat;
  background-image: url('/images/layout/topback.png');
}

.moveout {
  animation: moveout 0.32s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate(50, 0, 0);
}

@keyframes moveout {
  100% {
    transform: translate3d(-50px, 0, 0);
  }
}
</style>
