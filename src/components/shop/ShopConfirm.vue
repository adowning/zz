<script lang="ts" setup>
// import { useUserStore } from '@/stores/user.store'
import { ShopScreenName, useTransactionStore } from '@/stores/transaction.store'
import { nextTick, onMounted, ref, } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'

const eventBus = useEventManager()
const authStore = useAuthStore()
// const userStore = useUserStore()
const transactionStore = useTransactionStore()
const { getOperator, getSelectedPaymentMethod, getSelectedProduct } = storeToRefs(transactionStore)
const {
  wallet, // isLoading: authLoading, // If you need to show auth-specific loading in App.vue
} = storeToRefs(transactionStore)
const {
  currentUser, // isLoading: authLoading, // If you need to show auth-specific loading in App.vue
} = storeToRefs(authStore)
const _cashtag = ref()
const changeStores = ref(false)
const storeId = ref()
const showKeyboard = ref(false)
if (wallet?.value?.cashtag !== undefined) {
  _cashtag.value = wallet.value?.cashtag
}
if (getOperator.value?.id !== undefined) {
  console.log(getOperator.value)
  storeId.value = getOperator.value?.id
}
const errorMsg = ref('')
const value = ref<any>([])
const badTag = ref(false)
const badStore = ref(false)
const paymentMethodCorrect = ref(false)
const method = ref()
const _cashtag_field = ref('')
// function priceFormatted(price: number) {
//   return currency(price, true, 2)
// }

async function setCashtag(val: string) {
  // const tmp_cashtag = val.substring('$', '')
  //   const check = await checkCashtag(accessToken.value, val)
  // const check: any = await userStore.dispatchUserCashtag(
  //     val
  // )
  // // console.log(check)
  // if (check === 'invalid tag') {
  //   badTag.value = true
  //   errorMsg.value = 'Unable to verify cashtag'
  // }
  // if (check === 'cashtag in use') {
  //   badTag.value = true
  //   errorMsg.value = 'Cashtag in use'
  // // }
  // if (badTag.value) {
  //   setTimeout(() => {
  //     badTag.value = false
  //     _cashtag_field.value = ''
  //     errorMsg.value = ''
  //   }, 3000)
  // } else {
  // const updatedUser = await updateUserCashtag(accessToken.value, val)
  const updatedUser: any = await transactionStore.dispatchUserCashtag(val)
  console.log(updatedUser)
  _cashtag_field.value = ''
  errorMsg.value = ''
  _cashtag.value = updatedUser.cashtag
  // router.push('/shop')
  // eventBus.emit('activeName', 'shopConfirm')
  transactionStore.shopScreenNamee = ShopScreenName.CONFIRM
  // }
  // #27787-b
  method.value = 0
}
function setStore(value: any) {
  //   const store = await findStoreByCode(accessToken.value, val)
  // const {apiClient} = useApiClient()
  // const store: any = await api.shopController.send({ data: val });

  // // queryClient.invalidateQueries({ queryKey: ['userInfo'] })

  // if (store === "unable to find shop") {
  //   badStore.value = true;
  //   errorMsg.value = "Unable to verify store";
  // }
  // if (store === "already in shop") {
  //   badStore.value = true;
  //   errorMsg.value = "already in shop";
  // }
  // if (store === "already active shop") {
  //   badStore.value = true;
  //   errorMsg.value = "already active shop";
  // }
  //   else {
  //     const updatedUser = await updateUserCashtag(accessToken.value, val)
  //     //console.log(updatedUser)
  //     _storeId_field.value = ''
  //     errorMsg.value = ''
  //     _cashtag.value = updatedUser.cashtag

  //   }
  if (badStore.value) {
    setTimeout(() => {
      badStore.value = false
      value.value = []
      window.focus()
      errorMsg.value = ''
    }, 3000)
    return
  }
  // paymentMethods.value = store.acceptedPayments
  if (getOperator.value?.acceptedPayments.includes(getSelectedPaymentMethod.value)) {
    paymentMethodCorrect.value = true
  } else {
    paymentMethodCorrect.value = false
  }
  method.value = 0
}
async function checkCanOpenUrl() {
  // const { value } = await AppLauncher?.canOpenUrl({
  //   url: "com.squareup.cash",
  // });
  // console.log('Can open url: ', value)
}

async function confirm(paymentMethod: string) {
  console.log(paymentMethod)
  const product = getSelectedProduct.value
  const payment = getSelectedPaymentMethod.value

  const data: any = {
    amount: product?.amountToReceiveInCredits as number, // Amount user wants to deposit
    currencyId: 'USD', // Currency of the deposit
    paymentMethodId: payment, // Identifier for the chosen payment method (e.g., 'cashapp', 'stripe_card')
    productId: product?.id, // Optional ID of a deposit package/product being purchased
  }
  if (payment === 'CASHAPP') {
    // data.paymentMethod = "CASHAPP";
  }

  if (payment === 'INSTORE') {
    // data.paymentMethod = "INSTORE";
  }
  // data.productid = transactionStore.getSelectedProduct?.id;
  // const api = getApiClient()
  //   const balanceTransaction = await createbalanceTransaction(accessToken.value, data)
  // const tran = await api.transactionControllerCreate.send({ data });
  await transactionStore.dispatchUserDepositSubmit(data)
  // const sse = await api.transactionSseControllerCreate({ body: tran })
  // console.log(tran)
  // //console.log(sse)
  // await transactionStore.dispatchGetTransactions()
  if (payment === 'CASHAPP') {
    checkCanOpenUrl()
  }
  // queryClient.invalidateQueries({ queryKey: ['user'] })

  // //console.log('tick')
  // target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
  nextTick(() => {
    // console.log('nextTick callback')
    eventBus.emit('activeName', 'none')
    // $bus.$emit(eventTypes.setPending)
    // $bus.$emit(eventTypes.closeShop)
  })
}

onMounted(() => {
  // console.log(state.value.shop.acceptedPayments)
  // //console.log(state.value.shop.paymentMethod)
  // paymentMethods = state.value.shop.acceptedPayments/
  // console.log(operatorData.value.acceptedPayments);
  console.log(getSelectedPaymentMethod.value)
  if (transactionStore.getOperator?.acceptedPayments.includes(getSelectedPaymentMethod.value)) {
    paymentMethodCorrect.value = true
  }
})
</script>

<template>
  <div v-if="currentUser !== null" class="flex flex-col items-end justify-between" style="min-height: 400px">
    <div v-if="getSelectedPaymentMethod === 'CASH_APP'">
      <div v-if="_cashtag == null || _cashtag === undefined || _cashtag === ''">
        <div class="mx-auto mt-6 flex flex-col justify-center">
          <h3 id="words" class="glow text-xsmall mb-2 w-full px-6 text-white" style="font-size: 18px">
            Enter the cashtag your deposit will be coming from
          </h3>
          <div v-if="badTag" style="color: red; font-size: 18px; font-weight: 600; margin: auto; padding-bottom: 4px">
            {{ errorMsg }}
          </div>
          <div v-else style="color: red; font-size: 18px; font-weight: 600; margin: auto; padding-bottom: 4px">
            &nbsp;
          </div>
          <!-- <FormField
            v-model="_cashtag_field"
            :disabled="badTag"
            class="flex justify-center bg-black"
            minlength="4"
            maxlength="10"
            style="
              /* font-size: 38px;
              background-color: black;
              border-style: solid;
              border-radius: 15px;
              border-color: white;
              border-width: 2px;
              width: 50vw;
              margin: auto; */
            "
          > -->
          <input ref="_cashtag_field"  v-model="_cashtag_field" class="futex-cell mt-12" style="
              font-size: 28px;
              color: white;
              padding: 8px;
              background-color: black;
              border-style: solid;
              border-radius: 10px;
              border-color: white;
              border-width: 1px;
              width: 70vw;
              margin: auto;
              margin-top: 12px;
            ">
          <!-- <FormControl v-model="_cashtag_field" /> -->
          <!-- </FormField> -->
          <!-- <GlassButton
            :disabled="_cashtag_field.length < 4"
            title="Submit"
            color="green"
            class="hind-guntur-semibold pa-0 ma-0"
            style="
              line-height: 1.2;
              padding-bottom: 1px;
              margin: auto;
              margin-bottom: 120px;
              margin-top: 16px;
            "
            @click="_cashtag_field.length > 4 ? setCashtag(_cashtag_field) : ''"
          >
            SUBMIT
          </GlassButton> -->
        </div>
        <div class="mx-16 mb-12 flex flex-row justify-center" style="margin-bottom: 10px; margin-top: 16px">
          <div @click="setCashtag(_cashtag_field)">
            <GlassButton :disabled="_cashtag_field.length < 4 || badTag === true" color="green">
              Submit
            </GlassButton>
          </div>
        </div>
      </div>

      <div v-if="
        storeId !== null
        && transactionStore.getSelectedPaymentMethod == 'INSTORE_CASH'
        && paymentMethodCorrect === true
      " class="flex flex-col justify-start">
        <div style="
            background-image: url('/images/cell_noglow_trans.avif');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            border-image-slice: 60px 60px fill;
            border-image-repeat: space;
            border-image-width: 22px;
            width: 80vw;
            height: 100px;
          ">
          <div class="glow flex py-2" style="font-size: 18px">
            Once submitted the order will remain pending until a cashier at the store confirms
            payment
          </div>
        </div>
        <div class="margin-auto text-align-center mx-3 flex flex-row justify-start pt-2" style="
            height: 80px;
            background: url('/images/input.avif') no-repeat;
            background-size: 100% 100%;
            background-position: center;
            padding: 18px;
          ">
          <div class="h-100 text-align-center flex flex-row items-center justify-between" style="margin: auto">
            <img src="/images/shop/shopcoin.avif" color="green" style="color: white; width: 35px; height: 35px">
            <div class="bungee mt-0" style="font-weight: 700; font-size: x-large; color: white">
              <h4 class="bungee" style="font-size: x-large">
                &nbsp;&nbsp;{{ getSelectedProduct?.amountToReceiveInCredits }}
              </h4>
            </div>

            <div class="grow-1 flex" style="width: 15px" />
            <div />
            <img src="/images/shop/shoparrow.avif" color="green" style="width: 20px; height: 20px">
            <div color="green" style="width: 15px; font-weight: 700" />
            <div class="text-align-center mt-1" style="font-weight: 700; font-size: medium; color: yellow">
              {{ currentUser?.username }}
            </div>
          </div>
        </div>
        <h3 class="margin-auto mb-2 text-center text-white" style="font-size: 18px; font-weight: 500">
          Amount due:
        </h3>
        <div>
          <h1 class="margin-auto glow mb-2 text-center text-white" style="font-size: 32px">
            ${{ getSelectedProduct?.priceInCents! / 100 }}.00
          </h1>
        </div>
        <div class="margin-auto w-100% mb-12 mt-4 flex flex-row justify-center" style="
            margin: auto;
            margin-bottom: 89px;
            margin-top: 16px;
            width: 100%;
            justify-content: center;
            height: 40px;
          ">
          <div @click="confirm('CASHAPP')">
            <GlassButton color="green">
              Confirm
              <span class="loading loading-spinner loading-lg" />
            </GlassButton>
          </div>
        </div>
      </div>
      <div v-if="
        _cashtag !== null
        && _cashtag !== undefined
        && _cashtag !== ''
        && storeId !== null
        && transactionStore.operator?.acceptedPayments.includes('CASH_APP')
        && paymentMethodCorrect === true
        && getSelectedPaymentMethod === 'CASH_APP'
        && _cashtag !== null
        && transactionStore.operator?.acceptedPayments.includes('CASH_APP')
      " class="flex flex-col">
        <div class="glow font-small my-2" style="font-size: medium">
          Click confirm to be taken to cashapp
        </div>
        <div class="margin-auto text-align-center mx-3 flex flex-row justify-start pt-2" style="
            height: 80px;
            background: url('/images/input.avif') no-repeat;
            background-size: 100% 100%;
            background-position: center;
            padding: 18px;
          ">
          <div class="text-align-center flex flex-row items-center justify-between pt-1" style="margin: auto">
            <img src="/images/shop/shopcoin.avif" color="green" style="color: white; width: 35px; height: 35px">
            <div class="bungee mt-0" style="font-weight: 700; font-size: x-large; color: white">
              <h4 class="bungee" style="font-size: x-large">
                &nbsp;&nbsp;{{ getSelectedProduct?.amountToReceiveInCredits }}
              </h4>
            </div>

            <div class="grow-1 flex" style="width: 15px" />
            <div />
            <img src="/images/shop/shoparrow.avif" color="green" style="width: 20px; height: 20px">
            <div color="green" style="width: 15px; font-weight: 700" />
            <div class="text-align-center mt-0" style="font-weight: 700; font-size: small; color: white">
              {{ currentUser.username }}
            </div>
          </div>
        </div>
        <h3 class="margin-auto mt-2 text-center text-white" style="font-size: 18px; font-weight: 500">
          Amount due:
        </h3>
        <div>
          <h1 class="margin-auto glow my-1 text-center text-green-500" style="font-size: 32px">
            ${{ getSelectedProduct?.priceInCents! / 100 }}.00
          </h1>
        </div>
        <div class="margin-auto w-100% mb-12 mt-3 flex flex-row justify-center" style="
            margin: auto;
            margin-bottom: 89px;
            margin-top: 16px;
            width: 100%;
            justify-content: center;
            height: 40px;
          ">
          <div class="color-white flex flex-col gap-3" @click="confirm('cashapp')">
            <GlassButton color="green" style="
                margin: auto;
                margin-bottom: 12px;
                max-width: 130px;
                font-size: 24px;
                font-weight: 700;
                padding: 8px 18px;
              ">
              Confirm
              <span class="loading loading-spinner loading-lg" />
            </GlassButton>
            <div class="color-white-900 flex text-center" style="
                line-height: 1;

                color: white;
                font-size: 15px;
                font-weight: 700;
                margin: auto;
                width: 80vw;
              ">
              <span>Purchase will be applied to the account with cashtag
                <span style="color: yellow; line-height: 1.8">${{ wallet!.cashtag }}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="getSelectedPaymentMethod === 'INSTORE_CASH'">
      <div v-if="
        storeId == null
        || storeId.length === 0
        || storeId === undefined
        || (changeStores === true && paymentMethodCorrect === false)
      ">
        <div class="mx-auto flex flex-col justify-start">
          <h3 v-if="changeStores === false" id="words" class="glow text-small mb-2 w-full text-pretty text-white"
            style="font-size: 24px">
            Cannot find a store associated with this account. <br>Please enter a valid store id
          </h3>
          <h3 v-if="changeStores === true" id="words" class="glow text-small mb-2 w-full text-pretty text-white"
            style="font-size: 24px">
            <br>Please enter a valid store id
          </h3>
          <div v-if="badStore" style="color: red; font-size: 18px; font-weight: 600; margin: auto; padding-bottom: 4px">
            {{ errorMsg }}
          </div>
          <div v-else style="color: red; font-size: 18px; font-weight: 600; margin: auto; padding-bottom: 4px">
            &nbsp;
          </div>
          <!-- <Input
            :disabled="badStore"
            v-model="_storeId_field"
            label="Cashtag"
            class="flex justify-center bg-black"
            minlength="4"
            maxlength="10"
            style="
              font-size: 18px;
              background-color: black;
              border-style: solid;
              border-radius: 10px;
              border-color: white;
              border-width: 1px;
              width: 50vw;
              margin: auto;
            "
          >

        </Input> -->
          <div class="m-auto flex" />
          <div class="m-auto flex">
            <input :value="value.join('')" @focus="showKeyboard = true" @change="setStore(value)">
            <!-- <input
                v-model="passwordValue"
                type="password"
                :icon="mdiMail"
              /> -->
            <!-- </input> -->
          </div>
          <!-- <GlassButton
            :disabled="_cashtag_field.length < 4"
            title="Submit"
            color="green"
            class="hind-guntur-semibold pa-0 ma-0"
            style="
              line-height: 1.2;
              padding-bottom: 1px;
              margin: auto;
              margin-bottom: 120px;
              margin-top: 16px;
            "
            @click="_cashtag_field.length > 4 ? setCashtag(_cashtag_field) : ''"
          >
            SUBMIT
          </GlassButton> -->
        </div>
        <!-- <div
          v-if="storeId !== undefined && storeId !== ''"
          class="mb-12 mx-16 flex flex-row justify-center"
          style="margin-bottom: 150px; margin-top: 16px"
        >
          <GlassButton
            :disabled="storeId.length < 4 || badStore === true"
            color="green"
            style="
              padding-left: 22px;
              padding-right: 22px;
              font-weight: 800;
              font-size: x-large;
              color: white;
            "
            type="submit"
            @click="setStore(storeId)"
          >
            Submit
            <span class="loading loading-spinner loading-lg"></span>
          </GlassButton>
        </div> -->
      </div>
      <div v-if="
        getSelectedPaymentMethod === 'INSTORE_CASH'
        && storeId !== null
        && changeStores === false
        && !transactionStore.operator?.acceptedPayments.includes('INSTORE_CASH')
        && paymentMethodCorrect === false
      ">
        <div class="mx-auto flex flex-col justify-start">
          <h3 id="words" class="glow text-small mb-2 w-full text-pretty text-white" style="font-size: 24px">
            Your current active store/agent does not accept in store payments. Do you want to change
            your active store to a new store?
          </h3>

          <!-- <GlassButton
            :disabled="_cashtag_field.length < 4"
            title="Submit"
            color="green"
            class="hind-guntur-semibold pa-0 ma-0"
            style="
              line-height: 1.2;
              padding-bottom: 1px;
              margin: auto;
              margin-bottom: 120px;
              margin-top: 16px;
            "
            @click="_cashtag_field.length > 4 ? setCashtag(_cashtag_field) : ''"
          >
            SUBMIT
          </GlassButton> -->
        </div>
        <div class="mx-16 mb-12 flex flex-row justify-center gap-3" style="margin-bottom: 150px; margin-top: 16px">
          <div @click="eventBus.emit('activeName', 'selectPayment')">
            <GlassButton :disabled="storeId.length < 4 || badStore === true" color="red">
              No
            </GlassButton>
          </div>
          <div @click="changeStores = true">
            <GlassButton :disabled="storeId.length < 4 || badStore === true" color="green">
              Yes
            </GlassButton>
          </div>
        </div>
      </div>
      <div v-if="
        getSelectedPaymentMethod === 'INSTORE_CASH'
        && storeId !== null
        && transactionStore.operator?.acceptedPayments.includes('INSTORE_CASH')
        && paymentMethodCorrect === true
      " class="flex flex-col justify-start">
        <!-- <div class="futex-cell"> -->
        <div class="futex-cell">
          Once submitted the order will remain pending until a cashier at the store confirms payment
        </div>
        <!-- </div> -->
        <div class="margin-auto text-align-center mx-3 flex flex-row justify-start pt-2" style="
            height: 80px;
            background: url('/images/input.avif') no-repeat;
            background-size: 100% 100%;
            background-position: center;
            padding: 18px;
          ">
          <div class="h-100 text-align-center flex flex-row items-center justify-between pt-5" style="margin: auto">
            <img src="/images/shop/shopcoin.avif" color="green" style="color: white; width: 35px; height: 35px">
            <div class="bungee mt-0" style="font-weight: 700; font-size: x-large; color: white">
              <h4 class="bungee" style="font-size: x-large">
                &nbsp;&nbsp;{{ getSelectedProduct?.priceInCents }}
              </h4>
            </div>

            <div class="grow-1 flex" style="width: 15px" />
            <div />
            <img src="/images/shop/shoparrow.avif" color="green" style="width: 20px; height: 20px">
            <div color="green" style="width: 15px; font-weight: 700" />
            <div class="text-align-center mt-0" style="font-weight: 700; font-size: x-large; color: white">
              {{ currentUser?.username }}
            </div>
          </div>
        </div>
        <h3 class="margin-auto mb-2 text-center text-white" style="font-size: 18px; font-weight: 500">
          Amount due:
        </h3>
        <div>
          <h1 class="margin-auto glow mb-2 text-center text-white" style="font-size: 32px">
            ${{ getSelectedProduct?.priceInCents }}
          </h1>
        </div>
        <div class="margin-auto w-100% mb-12 mt-4 flex flex-row justify-center" style="
            margin: auto;
            margin-bottom: 89px;
            margin-top: 16px;
            width: 100%;
            justify-content: center;
            height: 40px;
          ">
          <div @click="confirm('INSTORE')">
            <GlassButton color="green" :shine="true">
              Confirm
              <span class="loading loading-spinner loading-lg" />
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-if="badTag" class="mx-auto">
    <span class="glow-light"> Unable to verify cashtag, please try again</span>
    <div inset>
      <Input
        v-model="_cashtag_field"
        label="Cashtag"
        class="glow justify-center bg-black"
        center
        minlength="4"
        maxlength="10"
        label-width="80px"
        label-align="left"
        style="
          font-size: 18px;
          background-color: black;
          border-style: solid;
          border-radius: 10px;
          border-color: white;
          border-width: 1px;
        "
      >
        <template #button>
          <GlassButton
            :disabled="_cashtag_field.length < 4"
            title="Submit"
            color="green"
            class="hind-guntur-semibold pa-0 ma-0"
            style="line-height: 1.2; padding-bottom: 1px"
            @click="_cashtag_field.length > 4 ? setCashtag(_cashtag_field) : ''"
          >
            SUBMIT
          </GlassButton>
        </template>
</Input>
</div>
</div> -->
</template>
