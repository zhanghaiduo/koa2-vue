const Router = require('koa-router')
const ArticleController = require('../controller/Article')
const AccountController = require('../controller/Account')
const PostsController = require('../controller/Posts')
// 服务器判断token是否是合法的
// 如果以后有哪些请求需要登录后才可以得到数据，在路由中加上checkToken
// 需要ID为1超管才能访问的接口，在路由前面加上/superAuth
const checkToken = require('../token/checkToken')
const subRouter = new Router()
// 登陆
subRouter.post('/login', AccountController.login)

// 账号----------
// 增
subRouter.post('/superAuth/account_create', checkToken, AccountController.account_create)
// 查
subRouter.post('/superAuth/account_list', checkToken, AccountController.account_list)
// 查详情
subRouter.post('/superAuth/account_detail', AccountController.account_detail)
// 删
subRouter.post('/superAuth/account_del', checkToken, AccountController.account_del)
// 改
subRouter.post('/superAuth/account_update', checkToken, AccountController.account_update)

// 软文----------
// 增
subRouter.post('/article_create', checkToken, ArticleController.article_create)
// 查
subRouter.post('/article_list', checkToken, ArticleController.article_list)
// 查详情
subRouter.post('/article_detail', ArticleController.article_detail)
// 删
subRouter.post('/article_del', checkToken, ArticleController.article_del)
// 改
// subRouter.post('/article_update', checkToken, ArticleController.article_update)

// 部门----------
// 增
subRouter.post('/superAuth/posts_create', checkToken, PostsController.posts_create)
// 查
subRouter.post('/posts_list', checkToken, PostsController.posts_list)
// 查详情
subRouter.post('/superAuth/posts_detail', PostsController.posts_detail)
// 删
subRouter.post('/superAuth/posts_del', checkToken, PostsController.posts_del)
// 改
// subRouter.post('/superAuth/posts_update', checkToken, PostsController.posts_update)

module.exports = subRouter

