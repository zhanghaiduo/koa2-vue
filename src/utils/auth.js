import Cookies from 'js-cookie'

const TokenKey = 'ZQ-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 24 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getLocalstorageInfo() {
  return localStorage.getItem('info')
}
export { TokenKey }
