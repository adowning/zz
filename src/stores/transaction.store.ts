import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getApiOperatorsProducts } from '@/gen/api/operator'
import { getApiTransactionsDepositsTop10, postApiTransactionsDeposits } from '@/gen/api/transactions'
import { getApiWallets, postApiWalletsCashtag } from '@/gen/api/wallets'
import { PostApiTransactionsDepositsBody } from '@/gen/models'
import { convertDatesToStrings } from '@/utils/normalize'
import { OperatorType, ProductType, TransactionType, Wallet } from '~/types'
import { handleException } from './exception'

// import type { GetPixInfo, DepositHistoryResponse } from '@/interfaces'

export enum ShopScreenName {
  SELECT_PRODUCT,
  SELECT_PAYMENT,
  CONFIRM,
}
export const useTransactionStore = defineStore('transaction', () => {
  // State properties converted to reactive references
  const success = ref(false)
  // For fetching current user via ORPC
  const errMessage = ref('')
  const depositConfig = ref<any>({
    // Keeping 'any' type as in original
    bonus: [
      {
        type: 0,
      },
    ],
  })
  const depositSubmit = ref<any>({}) // Keeping 'any' type as in original
  const shopOpen = ref(false)
  const products = ref<Omit<ProductType, 'operator' | 'transactions'>[]>([])
  const selectedPaymentMethod = ref<string>('')
  const selectedProduct = ref<Omit<ProductType, 'operator' | 'transactions'>>()
  const operator = ref<OperatorType>()
  const depositHistory = ref<TransactionType[]>([])
  // const depositHistoryItem = ref<DepositHistoryResponse>({} as DepositHistoryResponse) // Keeping type assertion as in original
  const shopScreenNamee = ref<ShopScreenName>(ShopScreenName.SELECT_PRODUCT)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getDepositCfg = computed(() => depositConfig.value)
  const getDepositSubmit = computed(() => depositSubmit.value)
  // const getDepositHistoryItems = computed(() => depositHistoryItem.value.record)
  const getProducts = computed(() => products.value)
  const getOperator = computed(() => operator.value)
  const getSelectedPaymentMethod = computed(() => selectedPaymentMethod.value)
  const getSelectedProduct = computed(() => selectedProduct.value)
  const getDepositHistory = computed(() => depositHistory.value)
  const wallet = ref<Wallet>()

  const setDepositInfo = (_wallet: Wallet, _operator?: OperatorType) => {
    wallet.value = _wallet
    operator.value = _operator
  }

  // function clearDepositInfo() {
  //   wallet.value = undefined
  //   operator.value = undefined
  // }

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }
  const setshopScreenNamee = (screenName: ShopScreenName) => {
    shopScreenNamee.value = screenName
  }
  const toggleShopOpen = () => {
    shopOpen.value = !shopOpen.value
    console.log(shopOpen.value)
  }
  const setSelectedPaymentMethod = (method: string) => {
    selectedPaymentMethod.value = method
  }
  const setSelectedProduct = (product: Omit<ProductType, 'operator' | 'transactions'>) => {
    selectedProduct.value = product
  }
  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setDepositSubmit = (submit: any) => {
    // Keeping 'any' type as in original
    depositSubmit.value = submit
  }

  const setDepositHistory = (items: TransactionType[]) => {
    depositHistory.value = items
  }
  const setWallet = (item: Wallet) => {
    wallet.value = item
  }
  const setBalance = (val: number) => {
    if(!wallet.value) {return}
    wallet.value.balance = val
  }
  const setProducts = (items: ProductType[]) => {
    //   const mappedProducts: Omit<Product, 'operator' | 'transactions'>[] = items.map((product) => ({
    //     id: product.id,
    //     title: product.title,
    //     description: product.description,
    //     url: product.url,
    //     productType: product.productType,
    //     bonusCode: product.bonusCode,
    //     bonusTotalInCredits: product.bonusTotalInCredits,
    //     priceInCents: product.priceInCents,
    //     amountToReceiveInCredits: product.amountToReceiveInCredits,
    //     bestValue: product.bestValue,
    //     discountInCents: product.discountInCents,
    //     bonusSpins: product.bonusSpins,
    //     isPromo: product.isPromo,
    //     totalDiscountInCents: product.totalDiscountInCents,
    //     shopId: product.shopId,
    //     createdAt: product.createdAt,
    //     updatedAt: product.updatedAt,
    //   }))
    products.value = items
  }
  const setOperator = (item: OperatorType) => {
    operator.value = item
  }
  // const { deposit: depositApi } = useApiClient()
  const dispatchProducts = async () => {
    setSuccess(false)
    try {
      const response = await getApiOperatorsProducts()
      if (response.status === 200) {
        setSuccess(true)
        const data = convertDatesToStrings(response.data)

        setProducts(data)
      }
    } catch (error: any) {
      setErrorMessage(handleException(error.code))
    }
  }

  async function dispatchOperatorProducts(): Promise<boolean> {
    try {
      const response = await getApiOperatorsProducts()
      if (response.status === 200) {
        const operator = convertDatesToStrings(response.data.operator)
        setOperator(operator)
        setProducts(operator.products)
        return true
      }
      return false
    } catch (error: any) {
      setErrorMessage(handleException(error.code))
      return false
    }
  }
  // user deposit configuration
  // const dispatchUserDepositCfg = async () => {
  //   setSuccess(false)
  //   try {
  //     const response = await depositApi.getDepositMethods()
  //     setSuccess(true)
  //     setDepositCfg(response)
  //   } catch (error: any) {
  //     setErrorMessage(handleException(error.code))
  //   }
  // }

  // user deposit submit
  const dispatchUserDepositSubmit = async (depositData: PostApiTransactionsDepositsBody) => {
    setSuccess(false)
    try {
      const response = await postApiTransactionsDeposits(depositData)
      console.log(response)
      if (response.status === 201) {
        setDepositSubmit(response)
        setSuccess(true)
      }
    } catch (error: any) {
      setErrorMessage(handleException(error.code))
    }
  }
  async function dispatchUserWallet(): Promise<boolean> {
    try {
      const response = await getApiWallets()
      if (response.status === 200) {
        const data = convertDatesToStrings(response.data)
        setWallet(data)
        return true
      }
      return false
    } catch (e: any) {
      setErrorMessage(handleException(e.code))
      return false
    }
  }
  // user deposit history
  const dispatchUserDepositHistory = async () => {
    console.log('x')
    setSuccess(false)
    try {
      const response = await getApiTransactionsDepositsTop10()
      if (response.status === 200) {
        setSuccess(true)
        if(response.data.deposits.length === 0) {
          setDepositHistory([])
          return
        }
        console.log(response.data.deposits)
        setDepositHistory(
          response.data.deposits.map((item: any) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
            processedAt: item.processedAt ? new Date(item.processedAt) : null,
          })),
        )
      }
    } catch (e: any) {
      console.log(e)
      setSuccess(false)
      setErrorMessage(handleException(e.code))
    }
  }
  const dispatchCancelPending = () => {
    setSuccess(false)
    try {
      // const response = await pos
      // if(response.status === 200){
      // console.log(response)
      // setSuccess(true)
      // }
      // if (response > 0) {await dispatchUserDepositHistory()}
    } catch (error: any) {
      setErrorMessage(handleException(error.code))
    }
  }

  const dispatchUserCashtag = async (cashtag: string): Promise<string | { success: false; error: any } | undefined> => {
    try {
      const response = await postApiWalletsCashtag({ cashtag })
      if (response.status === 200) {
        wallet.value!.cashtag = response.data.cashtag
        return response.data.cashtag
      }
    } catch (e: any) {
      console.error('UserStore: Failed to update cashtag', e)
      return { success: false, error: 'bad call' }
    }
  }

  // Return all state, getters, and actions
  return {
    dispatchUserCashtag,
    shopOpen,
    toggleShopOpen,
    dispatchProducts,
    getProducts,
    getOperator,
    getSelectedPaymentMethod,
    setSelectedPaymentMethod,
    getSelectedProduct,
    setSelectedProduct,
    errMessage,
    shopScreenNamee,
    depositHistory,
    depositSubmit,
    operator,
    getSuccess,
    getErrMessage,
    getDepositCfg,
    getDepositSubmit,
    setOperator,
    setSuccess,
    setErrorMessage,
    setDepositSubmit,
    getDepositHistory,
    setDepositInfo,
    // dispatchUserDepositCfg,
    dispatchUserDepositSubmit,
    dispatchUserDepositHistory,
    dispatchCancelPending,
    setshopScreenNamee,
    setDepositHistory,
    dispatchOperatorProducts,
    dispatchUserWallet,
    wallet,
    setBalance,
  }
})

// export const depositStore = useDepositStore()
