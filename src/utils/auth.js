import Cookies from 'js-cookie'

const TokenKey = 'ZQ-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 24 })
}

export function removeToken() {
  localStorage.removeItem('USER_INFO')
  return Cookies.remove(TokenKey)
}
export function setUserInfo(data) {
  return localStorage.setItem('USER_INFO', JSON.stringify(data))
}

export { TokenKey }
