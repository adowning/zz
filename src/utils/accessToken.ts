
const tokenTableName = 'access-token'
const storage = 'localStorage'

export function getAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken: string) {
  if (storage) {
    (window as any).accessToken = accessToken
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else {
      return localStorage.setItem(tokenTableName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken)
  }
}

/**
 * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}