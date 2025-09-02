import { onUnmounted } from 'vue'
import { Zero } from '@rocicorp/zero'
import { useAuthStore } from '@/stores/auth.store'
import { useTransactionStore } from '@/stores/transaction.store'
import { useVipStore } from '@/stores/vip.store'
import type { User, VipInfo, Wallet } from '~/types'
import { schema } from '../../shared/zero_w_permissions'
import { useEventManager } from './useEventManager'

export function useRealtimeUpdates() {
  const eventManager = useEventManager()
  const authStore = useAuthStore()
  const transactionStore = useTransactionStore()
  const vipStore = useVipStore()
  const setupEventListeners = (): (() => void) => {
    const updateUser = (userData: unknown): void => {
      if (!userData || typeof userData !== 'object' || !authStore.currentUser) {
        return
      }

      // Create a new user object with updated properties
      const updatedUser = { ...authStore.currentUser } as User
      const userDataObj = userData as Partial<User>

      // Only update existing properties that are allowed
      Object.entries(userDataObj).forEach(([key, value]) => {
        if (key in updatedUser && value !== undefined) {
          // Use type assertion to handle the index signature
          const userKey = key as keyof User
          updatedUser[userKey] = value as never
        }
      })

      authStore.currentUser = updatedUser
    }
    const _updateWallet = (walletData: unknown): void => {
      if (!walletData || typeof walletData !== 'object' || !transactionStore.wallet) {
        return
      }

      // Create a new wallet object with updated properties
      const updatedWallet = { ...transactionStore.wallet } as Wallet
      const walletDataObj = walletData as Partial<Wallet>

      // Only update existing properties that are allowed
      Object.entries(walletDataObj).forEach(([key, value]) => {
        if (key in updatedWallet && value !== undefined) {
          // Use type assertion to handle the index signature
          const walletKey = key as keyof Wallet
          updatedWallet[walletKey] = value as never
        }
      })

      transactionStore.wallet = updatedWallet
    }
    const _updateVipInfo = (vipData: unknown): void => {
      if (!vipData || typeof vipData !== 'object' || !vipStore.getVipInfo) {
        return
      }

      // Create a new vip object with updated properties
      const updatedVipInfo = { ...vipStore.getVipInfo } as VipInfo
      const vipDataObj = vipData as Partial<VipInfo>

      // Only update existing properties that are allowed
      Object.entries(vipDataObj).forEach(([key, value]) => {
        if (key in updatedVipInfo && value !== undefined) {
          // Use type assertion to handle the index signature
          const vipKey = key as keyof VipInfo
          updatedVipInfo[vipKey] = value as never
        }
      })

      vipStore.setVipInfo(updatedVipInfo) //= updatedVipInfo as VipInfo
    }
    const updateWallet = (walletData: unknown): void => {
      // Wallet updates will be handled by the backend through the user object
      if (walletData && typeof walletData === 'object') {
        _updateWallet({ wallet: walletData })
      }
    }

    const updateVipInfo = (vipData: unknown): void => {
      // VIP info updates will be handled by the backend through the user object
      if (vipData && typeof vipData === 'object') {
        _updateVipInfo({ vipInfo: vipData })
      }
    }

    // Register event listeners
    eventManager.on('user:updated', updateUser)
    eventManager.on('wallet:updated', updateWallet)
    eventManager.on('vip:updated', updateVipInfo)

    // Return cleanup function
    return (): void => {
      eventManager.off('user:updated', updateUser)
      eventManager.off('wallet:updated', updateWallet)
      eventManager.off('vip:updated', updateVipInfo)
    }
  }

  const setupZero = () => {
    if(authStore.currentUser === null){
      console.log('No current user, skipping Zero setup')
      return
    }
    console.log('Setting up Zero for user:', authStore.currentUser)
    // Initialize Zero client
      const z = new Zero({
      userID: authStore.currentUser!.id,
      // auth: () => authStore.getAccessToken || undefined,
      server: import.meta.env.VITE_ZERO_SERVER,
      schema,
      kvStore: 'mem',
    })
    // z.query.wallets.where('userId', authStore.currentUser!.id).one().preload()
    // z.query.wallets
    //   .where('userId', authStore.currentUser!.id)
    //   .one()
    //   .materialize()
    //   .addListener((wallet, walletResult) => {
    //     console.log(wallet)
    //     console.log(walletResult)
    //     if(walletResult === 'complete' && wallet){
    //       transactionStore.wallet = wallet as unknown as Wallet
    //     }
    //   })

    // z.query.users
    //   .where('id', authStore.currentUser!.id)
    //   .one()
    //   .materialize()
    //   .addListener((user, userResult) => {
    //     console.log(user)
    //     console.log(userResult)
    //     if(userResult === 'complete' && user){
    //       authStore.currentUser = user as unknown as User
    //     }
    //   })
    // const vipInfo = z.query.vipInfo.where('userId', authStore.currentUser!.id).one().preload()

    // console.log(vipInfo)


const { data: wallet } = useQuery(z.query.wallets
      .where('userId', authStore.currentUser!.id)
      .one())
    watch(wallet, (newWallet) => {
      if (newWallet) {
        console.log('Wallet update from Zero:', newWallet)
        console.log('Wallet update from Zero:', wallet)
        transactionStore.wallet = newWallet as unknown as Wallet
      }
    }, { immediate: true })

    const { data: vipInfo } = useQuery(z.query.vipInfo
      .where('userId', authStore.currentUser!.id)
      .one())
    watch(vipInfo, (newVipInfo) => {
      if (newVipInfo) {
      console.log('vipInfo update from Zero:', newVipInfo)
        console.log('vipInfo update from Zero:', vipInfo )
        vipStore.setVipInfo(newVipInfo as unknown as VipInfo)
      }
    }, { immediate: true })

    // const wallet = z.query.wallets.where('userId', authStore.currentUser!.id).all().materialize()
    // await wallet.fetch()
    // console.log('Initial wallet from Zero:', wallet.get())
    // wallet.subscribe(w => {
    //   console.log('Wallet update from Zero:', w)
    //   if(w.length > 0){
    //     const w0 = w[0]
    //     transactionStore.wallet = {
    //       id: w0.id,
    //       balance: w0.balance,
    //       userId: w0.userId,
    //       operatorId: w0.operatorId,
    //     }
    //   }
    //  })
    z.mutate.users.update({ id: authStore.currentUser!.id, lastSeen: new Date().getTime() })
    console.log('Zero setup complete')
  }

  onUnmounted(() => {
    setupEventListeners()()
  })

  return {
    setupEventListeners,
    setupZero,
  }
}
