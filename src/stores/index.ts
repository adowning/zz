import { App } from "vue"
// import { Zero } from '@rocicorp/zero'

// // import { schema } from '../../shared/zero_w_permissions'
// const hasRan = ref(false)
//  async function hydrate (){
// hasRan.value = true
//    const authStore = useAuthStore()
//    const vipStore = useVipStore()
//    const gameStore = useGameStore()
//    const transactionStore = useTransactionStore()
//  const results = await Promise.all([
//                 gameStore.fetchAllGames(),
//                 gameStore.fetchTopWins(),
//                 vipStore.fetchAllVipLevels(),
//                 vipStore.fetchVipInfo(),
//                 transactionStore.dispatchOperatorProducts(),
//                 transactionStore.dispatchUserWallet(),
//             ])
//             const success = results.every(v => v === true)
//             if(success) {
//                 console.info('All stores hydrated successfully. ',success)
//                 try{
//                  const z = new Zero({
//           userID:  authStore.currentUser!.id,
//           // auth: () => authStore.getAccessToken || undefined,
//           server: import.meta.env.VITE_ZERO_SERVER,
//           schema,
//           // This is often easier to develop with if you're frequently changing
//           // the schema. Switch to 'idb' for local-persistence.
//           kvStore: 'mem',
//         })
//         console.log(z)
//       }catch(e){
//         console.log(e)
//       }
//             } else {
//                 console.info('Some stores failed to hydrate.')
//                 authStore.setTokens({accessToken: null})
                
//             }
// }
 const init = async () =>{
   const authStore = useAuthStore()
    await authStore.init()
    const token = authStore.getAccessToken
    if(token){
      try{
        // await hydrate()
       
      }catch(e){
        console.error('Error hydrating stores:', e)
      }
    }
  }

export async function resetSetupStore() {
  // const vipStore = useVipStore()
  // const gameStore = useGameStore()
  // const transactionStore = useTransactionStore()
  // await vipStore.reset()
  // await gameStore.reset()
  // await transactionStore.reset()
  await init()
  console.log('Stores have been reset and reinitialized.')
    }

export async function setupStore(app: App) {
  const store = createPinia();
console.log('running setup yay')
//   store.use(resetSetupStore);
  app.use(store);
   await init()

}