const Router = require('koa-router')
const ResumeController = require('../controller/Resume')
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

// 简历列表----------
// 增
subRouter.post('/resume_create', checkToken, ResumeController.resume_create)
// 查
subRouter.post('/resume_list', checkToken, ResumeController.resume_list)
// 查详情
subRouter.post('/resume_detail', ResumeController.resume_detail)
// 删
subRouter.post('/resume_del', checkToken, ResumeController.resume_del)
// 改
subRouter.post('/resume_update', checkToken, ResumeController.resume_update)

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

