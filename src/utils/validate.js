/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const reg = /^[a-zA-Z0-9]{2,25}$/
  return reg.test(str)
}
// 密码
export function isvalidPassword(str) {
  const reg = /^(?![0-9]+$)(?![A-Z]+$)(?![a-z]+$)(?![`~!@#$%^&.*"“”_+<>{}\/'[\]]+$)[0-9|A-Z|a-z|`~!@#$%^&.*_"“”+<>{}\/'[\]]{6,16}$/
  return reg.test(str)
}
