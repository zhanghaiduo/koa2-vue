const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const KoaLogger = require('koa-logger')// 自动打log
const app = new Koa()
const router = new Router()
const static = require('koa-static')
// 配置静态web服务的中间件
app.use(static(__dirname + '../../dist'))
// 引入子路由
const subRouter = require('./routes/index')
router.use('/api', subRouter.routes(), subRouter.allowedMethods())

app.use(bodyParser())
app.use(router.routes(), router.allowedMethods())
app.use(KoaLogger())

app.listen(3000, () => {
  console.log('3000端口ok')
})

