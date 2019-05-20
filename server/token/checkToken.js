const jwt = require('jsonwebtoken')
module.exports = async(ctx, next) => {
  const token = ctx.get('ZQ-Token')
  if (token === '') {
    ctx.throw(401, "no token detected in http header 'ZQ-Token'")
  }
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, 'zhangqi') // 如果token过期或验证失败，将抛出错误
    if (ctx.request.url.includes('/superAuth') && tokenContent.posts_id !== 1) {
      ctx.throw(403)
    }
  } catch (err) {
    if (ctx.request.url.includes('/superAuth') && tokenContent.posts_id !== 1) {
      ctx.throw(403, 'No super authority')
    }
    ctx.throw(401, 'invalid token')
  }
  await next()
}
