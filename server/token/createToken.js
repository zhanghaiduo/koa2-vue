const jwt = require('jsonwebtoken')
module.exports = function(username, id) {
  const token = jwt.sign({
    username, // 使用用户名字符串作为token的凭证
    id // 使用ID之后做超管权限
  }, 'secret', {
    expiresIn: '3600s'
  })
  // secret是加密的密钥，验证的时候会用到.
  return token
}
