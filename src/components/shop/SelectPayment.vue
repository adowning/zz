<script lang="ts" setup>
import { ref } from 'vue'

import { useTransactionStore } from '@/stores/transaction.store'

const eventManager = useEventManager()
const depositStore = useTransactionStore()
// const router = useRouter();
const target = ref()
const method = ref(0)
const cashappSelected = ref(false)
const cashinstore = ref(false)
const hasPendingBalanceTransaction = ref(false)
// const balancetransactionsCanceled = ref(false);
// async function close() {
// await dispatchGetCurrentUser()
// await queryClient.invalidateQueries({ queryKey: ['user'] })
// $bus.$emit(eventTypes.setPending)
// target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
// nextTick(() => {
//   $bus.$emit(eventTypes.change_page, 0)
//   // delay(300)
//   $bus.$emit(eventTypes.show_bars, true)
// })
// }
function setMethod(_method: number) {
  console.log(_method)
  if (_method === 1) {
    cashappSelected.value = true
    cashinstore.value = false
    // console.log(state)
    depositStore.setSelectedPaymentMethod('CASH_APP')
  } else {
    cashappSelected.value = false
    cashinstore.value = true
    depositStore.setSelectedPaymentMethod('INSTORE_CASH')
  }
  method.value = _method
}
</script>

<template>
  <div ref="target" class="w-90vw mx-4 flex flex-col items-center justify-center gap-4">
    <div v-if="!hasPendingBalanceTransaction">
      <div :class="`${depositStore.operator?.acceptedPayments.includes('CASH_APP') ? '' : 'grayscale'
        }`" class="color-white relative m-auto my-2 flex w-[85vw] flex-row justify-start p-2" :style="`background-repeat: no-repeat;background-size: 100% 100%; background-image: url(${!cashappSelected ? '/images/shop/shopbar.avif' : '/images/shop/shopbar-selected.avif'
          });`" @click="setMethod(1)">
        <div class="pa-0 flex flex-row items-center" style="width: 20%; min-height: 40px">
          <img src="/images/layout/cashappicon.avif" class="ml-1 px-0"
            style="width: 40px; height: 40px; margin-left: 8px">
        </div>
        <div class="pa-0 mr-12 flex flex-row items-center" style="min-height: 50px">
          <div style="font-size: 22px; font-weight: 600; padding-bottom: 3px; color: white">
            use cashapp
          </div>
        </div>
      </div>
      <div :class="`${depositStore.operator?.acceptedPayments.includes('INSTORE_CASH') ? '' : 'grayscale'
        }`" class="color-white relative m-auto my-0.5 mb-12 flex w-[85vw] flex-row justify-start p-2" :style="`background-repeat: no-repeat;background-size: 100% 100%; background-image: url(${!cashinstore ? '/images/shop/shopbar.avif' : '/images/shop/shopbar-selected.avif'
          });`" @click="setMethod(2)">
        <div class="pa-0 flex w-full flex-row items-center" style="width: 20%; min-height: 40px">
          <img src="/images/shop/storebag.avif" class="ml-1 px-0" style="width: 40px; height: 50px; margin-left: 4px">
        </div>
        <div class="pa-0 mr-8 flex flex-row items-center" style="min-height: 40px">
          <div style="font-size: 22px; font-weight: 600; color: white; padding-bottom: 3px">
            pay in store
          </div>
        </div>
        <div class="grow-1 flex" />
        <div class="grow-1 pa-0 flex flex-col items-start justify-start"
          style="position: absolute; top: 10px; right: 9px; min-height: 40px">
          <div class="flex flex-col items-end">
            <div style="font-size: 12px; line-height: 1; font-weight: 600; font-style: italic">
              {{ depositStore.operator?.id }}
            </div>
            <div style="
                font-size: 12px;
                line-height: 1;
                font-weight: 700;
                color: lightskyblue;
                text-decoration: underline;
              ">
              change
            </div>
          </div>
        </div>
      </div>
      <div class="mb-12 flex w-full flex-row justify-center" style="margin-bottom: 150px">
        <div @click="eventManager.emit('activeName', 'confirm')  ">
          <GlassButton :disabled="method === 0 ? true : false">
            Next
            <span class="loading loading-spinner loading-lg" />
          </GlassButton>
        </div>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>
