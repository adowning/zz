// https://github.com/varletjs/axle
import { createAxle, requestMockInterceptor } from '@varlet/axle'
import { createApi } from '@varlet/axle/api'
import { createUseAxle } from '@varlet/axle/use'
import Mock from 'mockjs'

const PREFIX = 'https://apidev.cashflowcasino.com'
export const axle = createAxle({
  baseURL: import.meta.env.VITE_MOCK_API_BASE,
})

axle.useRequestInterceptor(
  requestMockInterceptor({
    mappings: [
      {
        url: '/**',
        delay: 300,
        handler({ params = {} }) {
          const { current = 1 } = params

          if (current === 3) {
            return {
              data: {
                code: 200,
                data: [],
                message: 'success',
              },
            }
          }

          const data = Array.from({ length: 10 }, () => {
            return {
              id: Mock.Random.id(),
            }
          })

          return {
            data: {
              code: 200,
              message: 'success',
              data,
            },
          }
        },
      },
    ],
  }),
)

axle.useResponseInterceptor({
  onFulfilled(response) {
    const { code, message } = response.data

    if (code !== 200 && message) {
      Snackbar.warning(message)
    }

    return response.data
  },

  onRejected(error) {
    Snackbar.error(error.message)
    return Promise.reject(error)
  },
})

export const useAxle = createUseAxle({
  axle,
  onTransform: (response) => response.data,
})

export const api = createApi(axle, useAxle)


export const customAxios = axle


// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return c.json();
  }

  if (contentType && contentType.includes('application/pdf')) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  console.log(`${PREFIX}${contextUrl}`)

  const url = new URL(`${PREFIX}${contextUrl}`);
  const pathname = url.pathname;
  const search = url.search;
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'productionBaseUrl'
      : 'https://apidev.cashflowcasino.com';

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

// NOTE: Add headers
const getHeaders = (headers?: HeadersInit, authStore?: any): HeadersInit => {
  return {
    ...headers,
    Authorization: `Bearer ${ authStore.getAccessToken || localStorage.getItem('accessToken') }`,
    'Content-Type': 'application/json',
  };
};


export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const isAuthEndpoint = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/refresh'
].some(path => requestUrl.includes(path))
  console.log(requestUrl)
  const authStore = useAuthStore()

  const requestHeaders = getHeaders(options.headers, authStore);
  let requestInit: RequestInit
  if (!isAuthEndpoint) {
    requestInit = {
      ...options,
      headers: requestHeaders,
      credentials: 'include'
    };
  } else {
    requestInit = {
      ...options,
    };
  }
  const request = new Request(requestUrl, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  return { status: response.status, data } as T;
};