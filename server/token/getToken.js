const jwt = require('jsonwebtoken')

module.exports = async(ctx) => {
  const token = ctx.get('ZQ-Token')
  const tokenContent = await jwt.verify(token, 'zhangqi')
  return tokenContent
}
