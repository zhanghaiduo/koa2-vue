const jwt = require('jsonwebtoken')
module.exports = function(doc) {
  const { username, id, posts_id } = doc
  const token = jwt.sign({
    username, // 使用用户名字符串作为token的凭证
    id, // 使用ID之后做超管权限
    posts_id // 使用posts_id之后做职位权限
  }, 'zhangqi', {
    expiresIn: '86400s'
  })
  // zhangqi是加密的密钥，验证的时候会用到.
  return token
}
