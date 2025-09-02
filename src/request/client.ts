import { createAxle, requestHeadersInterceptor } from '@varlet/axle'
import { storage } from '@/utils/storage'

// Create centralized axle instance
export const axle = createAxle({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://apidev.cashflowcasino.com',
  withCredentials: true
})

// Request interceptor for auth headers
// axle.useRequestInterceptor((config: AxleRequestConfig<any, any>) => {
//   const url = config.url || ''
//   const isAuthEndpoint = [
//     '/api/auth/login',
//     '/api/auth/signup', 
//     '/api/auth/refresh'
//   ].some(path => url.includes(path))

//   if (!isAuthEndpoint) {
//     const token = storage.getItem('accessToken')
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`
//       }
//     }
//   }
  
//   return config
// })
  const url = 'config.url' 
  const isAuthEndpoint = [
    '/api/auth/login',
    '/api/auth/signup', 
    '/api/auth/refresh'
  ].some(path => url.includes(path))
// Request interceptor for auth headers
axle.useRequestInterceptor(
  requestHeadersInterceptor({
    headers: () => {
      const token = storage.getItem('accessToken')
      return ( token && !isAuthEndpoint ) ? { Authorization: `Bearer ${token}`, 'use-credentials': 'true' } : {'use-credentials': 'true'} as Record<string, string>
      
    }
  })
)

// Response interceptor for token refresh
axle.useResponseInterceptor({
  onFulfilled: (response) => response.data,
  onRejected: async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    // Handle 401 unauthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Attempt token refresh
        const newToken = await refreshToken()
        if (newToken) {
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          const { method, url, data } = originalRequest
          return method === 'get'
            ? axle.get(url!, originalRequest)
            : axle.post(url!, data, originalRequest)
        }
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError)
        // Redirect to login or handle as needed
      }
    }

    return Promise.reject(error)
  }
})

// Token refresh helper
async function refreshToken(): Promise<string | null> {
  try {
    const response = await axle.post('/api/auth/refresh', null, {
      withCredentials: true
    })
    return response.data?.accessToken || null
  } catch (error) {
    console.error('Refresh token failed', error)
    return null
  }
}

// export default axle

export const customFetch = axle