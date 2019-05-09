const Router = require('koa-router')
const ArticleController = require('../controller/Article')
const UserController = require('../controller/User')
// 服务器判断token是否是合法的
// 如果以后有哪些请求需要登录后才可以得到数据，在路由中加上checkToken
const checkToken = require('../token/checkToken')
const subRouter = new Router()
// 登陆
subRouter.post('/login', UserController.login)

// 创建软文
subRouter.post('/article_create', checkToken, ArticleController.article_create)
// 获取软文
subRouter.post('/article_list', checkToken, ArticleController.article_list)
// 获取软文详情
subRouter.post('/article_detail', ArticleController.article_detail)
// 删除软文
subRouter.post('/article_del', checkToken, ArticleController.article_del)
// 更新软文
// subRouter.post('/article_update', checkToken, ArticleController.article_update)
module.exports = subRouter

