<script lang="ts" setup>
import { useTransactionStore, ShopScreenName } from '@/stores/transaction.store'
import { currency } from '@/utils/currency'
import type { ProductWithSelected } from './ShopView.vue'
import { Product } from '@/gen/models'

const eventManager = useEventManager()
const transactionStore = useTransactionStore()
const _productList = ref<Product[]>([])
console.log(_productList.value)
const productList = ref<ProductWithSelected[]>([])
console.log(productList.value)
function priceFormatted(price: number) {
  return currency(price, 'en-US', { currency: 'USD' })
}
const tempDepositAmount = ref(0)
function selectProduct(val: any) {
  console.log(val)
  transactionStore.setSelectedProduct(val)
  productList.value.forEach((product: any) => {
    product.selected = false
  })
  val.selected = true
}
if (_productList.value) {
  _productList.value.forEach((item) => {
    const pWithSel: ProductWithSelected = {
      ...item,
      selected: false,
    }
    productList.value.push(pWithSel)
  })
}
onMounted(() => {
    productList.value = transactionStore.getProducts.map((product) => ({
    ...product,
    selected: false,
    createdAt: product.createdAt?.toString() || '',
    updatedAt: product.updatedAt?.toString() || '',
  }))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // _productList.value = transactionStore.getProducts
})
</script>

<template>
  <div class="mx-1 flex flex-col items-end justify-between">
    <div class="h-100 flex w-full items-start justify-center">
      <div class="margin-auto flex flex-col" style="margin-top: 20px; margin-bottom: 20px">
        <div v-for="product of productList" :key="product.id" class="my-1 w-full gap-5 py-1" :style="`background-repeat: no-repeat;background-size: 100% 100%; background-image: url(${!product.selected
          ? '/images/shop/shopbar.avif'
          : '/images/shop/shopbar-selected.avif'
          });`" @click="selectProduct(product)">
          <div class="pa-0 mx-4 flex w-full flex-row items-center justify-between pl-1 pr-4"
            style="width: 100%; min-height: 40px">
            <div class="bungee flex flex-row items-center justify-start" style="width: 30%">
              <img src="/images/shop/shopcoin.avif" style="
                  width: 40px;
                  height: 40px;
                  margin-left: 3px;
                  margin-right: 4px;
                ">
              <div style="
                  min-width: 65px;
                  max-width: 65px;
                  font-weight: 400;
                  font-size: 22px;
                  margin-right: 5px;
                  /* font-family: ona; */
                  color: yellow;
                ">
                {{ product.amountToReceiveInCredits }}
              </div>
            </div>
            <div class="flex flex-row items-center justify-start" style="width: 40%">
              <img src="/images/shop/plusicon.avif" class="ml-1 px-0"
                style="width: 20px; height: 20px; margin-left: 14px">
              <div style="
                  background-image: url(&quot;/images/shop/freespins.png&quot;);
                  background-size: contain;
                  background-repeat: no-repeat;
                  background-position: center;
                  width: 100px;
                  height: 50px;
                  /* margin-left: 14px;
                  margin-right: 14px; */
                " :style="`filter: ${product.bonusSpins === 0 ? 'grayscale(100%)' : 'grayscale(0%)'}`">
                <div class="bungee" style="
                    -webkit-text-stroke: 0.5px black;
                    /* position: absolute; */
                    color: white;
                    padding: 17px;
                    padding-left: 32px;
                    padding-top: 12px;
                    top: 16px;
                    left: 20px;
                    font-weight: 900;
                    font-size: 17px;
                    font-family: Robot;
                  ">
                  {{ product.bonusSpins }}
                </div>
              </div>

              <img src="/images/shop/shoparrow.avif" class="px-0" style="width: 20px; height: 20px; margin-right: 10px">
            </div>
            <div class="flex flex-row items-center justify-end pr-4" style="width: 30%">
              <div style="
                  color: white;
                  font-weight: 900;
                  font-family: Bonzier;
                  color: green;
                  font-size: 22px;
                ">
                {{ priceFormatted(product.priceInCents / 100) }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 flex flex-row justify-center" style="margin-bottom: 0px; margin-top: 12px">
          <div @click="
          
            eventManager.emit('activeName', 'selectPayment')  
            ">
            <GlassButton :disabled="tempDepositAmount <= 0" color="green">
              Next
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
