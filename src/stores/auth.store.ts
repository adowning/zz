import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getApiAuthMe, postApiAuthLogin, postApiAuthSignup } from '@/gen/api/auth'
import { storage } from '@/utils/storage'
import { webSocketService } from '@/services/websocket.service'
import { notificationsWsBridge } from '@/services/ws.notifications'
import { userWsBridge } from '@/services/ws.user'
import { convertDatesToStrings } from '@/utils/normalize'
import type { User } from '~/types'
import { useAppStore } from './app.store'
import { JackpotContributionsOptionalDefaultsSchema } from '#/db'

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const TOKEN_KEY = 'accessToken'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)
  const hasRanInit = ref(false)

  const error = ref<string | null>(null)
  const isSignUpMode = ref(false)
  // readiness flag to coordinate guards/UI bootstrap
  const authReady = ref(false)

  // Get access token from memory or storage
  const getAccessToken = computed(() => accessToken.value || storage.getItem(TOKEN_KEY))

  function $reset() {
    currentUser.value = null
    accessToken.value = null
    error.value = null
    isLoading.value = false
  }

  // Clear auth state
  const clearAuth = () => {
    currentUser.value = null
    accessToken.value = null
    storage.removeItem(TOKEN_KEY)
    $reset()
  }

  const setTokens = (token: any) => {
    accessToken.value = token.accessToken
    storage.setItem(TOKEN_KEY, token.accessToken)
    console.log('Access token set:', token.accessToken)
  }
  // Note: Token refresh is now handled by the API client automatically
  // Set tokens in state and (re)install interceptors

  // Get current session
  const getSession = async () => {
    if (!accessToken.value) {
      return null
    }

    try {
      console.debug('[auth][getSession] requesting...')
      const response = await getApiAuthMe()
      console.debug('[auth][getSession] response ok=', !!response.data)
      if (response.status === 200 && response.data?.user) {
        // If you want to keep accessTokenExpiresAt as a string, do not convert to Date
        // If you need a Date object, consider adding a new property or updating the User type
        // Example: response.data.user.accessTokenExpiresAtDate = new Date(response.data.user.accessTokenExpiresAt)
        const data = convertDatesToStrings(response.data.user)
        currentUser.value = data

        return response.data
      }else{
        currentUser.value = null
        console.warn('[auth][getSession] no user data found')
        // If no user data, clear auth state
        await clearAuth()
        return null
      }
    } catch (error: any) {
      console.error('[auth][getSession] failed', error?.message || error)
      // If session fetch fails, try a one-time refresh
      // const newToken = await refreshAccessToken().catch(() => null)
      // if (newToken) {
        // return getSession() // Retry fetching session with new token
      // }
       clearAuth()

      }
      // console.debug('[auth][getSession] failed, attempting refresh', err?.message || err)
      // // Try a one-time refresh if session fetch failed
      // const newToken = await refreshAccessToken().catch(() => null)
      // if (newToken) {
      //   try {
      //     const response = await getApiAuthMe()
      //     if (response.status === 200 && response.data?.user) {
      //       const data = convertDatesToStrings(response.data.user)
      //       currentUser.value = data
      //       return response.data
      //     }
      //   } catch {
      //     // fallthrough to clear
      //   }
      // }
      // await clearAuth()
      // return err
    }
  // Sign up a new user
  const signUp = async (credentials: { username: string; password: string }) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await postApiAuthSignup({
        username: credentials.username,
        password: credentials.password,
      })

      if (response.data) {
        const { accessToken: at } = response.data as any
        if (at) {
          await setTokens({ accessToken: at })
          // optional: currentUser is loaded by getSession

          await getSession()
          return true
        }
      }
      return false
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'

      return false
    } finally {
      isLoading.value = false
    }
  }

  // Login user
  const login = async (credentials: { username: string; password: string }) => {
    const appStore = useAppStore()
    try {
      appStore.showLoading()

      isLoading.value = true
      error.value = null
      const response = await postApiAuthLogin({
        username: credentials.username,
        password: credentials.password,
      })
      // const response = await postApiAuthLogin({
      //     body: {
      //         username: credentials.username,
      //         password: credentials.password,
      //     },
      // })
      const responseData = response.data as any

      if (!responseData) {
        appStore.hideLoading()
        throw new Error('No data received from server')
      }
      if (responseData.error) {
        appStore.hideLoading()
        throw new Error(responseData.error.message || 'Login failed')
      }

      if (responseData.accessToken) {
        // Accept optional refreshToken from server for cookie-less fallback
         setTokens({
          accessToken: responseData.accessToken,
          refreshToken: responseData.refreshToken ?? null,
        })
        try {
           const response = await getApiAuthMe()
          if (response.status === 200 && response.data?.user) {
            const data = convertDatesToStrings(response.data.user)
            currentUser.value = data
          } else {
            throw new Error('Failed to fetch user data after login')
          } 
          console.debug('[auth][login] tokens set; fetching bootstrap data...')
          // await getSession()
          // webSocketService.initConnection()

          try {
            // router?.push('/')
          } catch (e) {
            console.log(e)
          }
          // appStore.hideLoading()

          return responseData
        } catch (e) {
          console.log(e)
          // appStore.hideLoading()
          // await clearAuth()
          // router?.push('/login')
        }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login'
      error.value = errorMessage

      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => currentUser.value !== null)

  // Toggle sign up mode
  const toggleSignUpMode = () => {
    isSignUpMode.value = !isSignUpMode.value
  }

  // Logout
  const logout = () => {
    // clearAuth()
     currentUser.value = null
    accessToken.value = null
    storage.removeItem(TOKEN_KEY)
    console.log('User logged out')
    return
    // router?.push('/login')

    // try {
    //   webSocketService.closeConnections()
    // } finally {
    //   userWsBridge.close()
    //   notificationsWsBridge.close()
    // }
  }

  // const setRouter = (r: Router) => {
  //   router = r
  // }

  // Initialize auth state
  // Initialize WebSocket connection
  const initWebSocket = (): void => {

    if (accessToken.value) {
      if (!webSocketService.isConnected()) {
        console.log('Initializing WebSocket connection...')
        webSocketService.initConnection()
      }
      userWsBridge.connect(accessToken.value)
      notificationsWsBridge.connect(accessToken.value)
    }
  }

  // Close WebSocket connection
  const closeWebSocket = (): void => {
    try {
      webSocketService.closeConnections()
    } finally {
      userWsBridge.close()
      notificationsWsBridge.close()
    }
  }

  // Initialize the store
  const init = async (): Promise<void> => {
      if (hasRanInit.value === true) return
    hasRanInit.value = true
    console.log('Auth store initialization started')
    
    accessToken.value =  localStorage.getItem('accessToken')
    try{
     const response = await getApiAuthMe()
      console.debug('[auth][getSession] response ok=', response.data)
      if (response.status === 200 && response.data?.user) {
      currentUser.value = {...response.data.user, accessTokenExpiresAt: new Date(response.data.user.accessTokenExpiresAt!), createdAt: new Date(response.data.user.createdAt!), updatedAt: new Date(response.data.user.updatedAt!)} as User
      console.log('User loaded from localStorage:', currentUser.value)

    }else{
      currentUser.value = null
      accessToken.value = null
      localStorage.removeItem('accessToken')
      console.warn('[auth][getSession] no user data found')
      // If no user data, clear auth state
      await clearAuth()
      }
    }catch(e){
      console.error('Error fetching user data:', e)
      currentUser.value = null
      accessToken.value = null
      localStorage.removeItem('accessToken')
    }
    if (!accessToken.value)
    return
    if (hasRanInit.value === true) return
    hasRanInit.value = true
    try {
      // client.instance.defaults.withCredentials = true
      let at
      // Load refresh token from sessionStorage for fallback flow
      try {
        console.log('[auth][initialization]')
        const rt = localStorage.getItem('cfc_refresh_token')
        if (rt) {
          // refreshToken.value = rt
        }
        at = localStorage.getItem('accessToken')

        console.log(at)
        if (at) {
          accessToken.value = at
          await getSession()
          // initWebSocket()
        } else {
          setTimeout(async () => {
            at = localStorage.getItem('accessToken')
            console.log(at)
            await getSession()
            // initWebSocket()
          }, 200)
        }
      } catch {}

      // Attempt silent refresh to avoid weekly re-login
      // const at = await refreshAccessToken()
      // if (at) {
      // await getSession()
      // initWebSocket()
      // }
    } catch (error) {
      console.error('Failed to initialize session:', error)
      clearAuth()
    } finally {
      console.log('setting auth ready to true')
      authReady.value = true
    }
  }

  // // Call init on store creation with debouncing to prevent rapid calls
  const debouncedInit = debounce(init, 300) // 300ms delay
  debouncedInit()

   const user = computed(() => currentUser.value)

  return {
    // State
    currentUser,
    getAccessToken,
    isLoading,
    error,
    isSignUpMode,
    authReady,
    logout,
    // Getters
    isAuthenticated,
    user,

    // Actions
    setTokens,
    // clearAuth,
    signUp,
    login,
    getSession,
    toggleSignUpMode,
    initWebSocket,
    closeWebSocket,
    init,
    // setRouter,
  }
})
