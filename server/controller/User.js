const UserModel = require('../model/UserModel')
// 引入创建token的方法
const createToken = require('../token/createToken')
class userController {
  /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
  // static 静态方法 不会被实例继承，而是直接通过类来调用
  static async create(ctx) {
    // 接收客服端  创建用户，暂时不开放...
  }

  /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async login(ctx) {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const doc = await UserModel.getUserByName(username)
    if (doc) {
      if (doc.password === password) {
        const token = createToken(username)
        // 更新 用户数据库的token
        await UserModel.updateUserToken(doc.id, { token })
        ctx.status = 200
        ctx.body = {
          code: 1,
          message: '登录成功',
          token: token, // 用户的token信息
          username: doc.username // 登录的用户名
        }
      } else {
        // 用户名不存在
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '密码错误，请重新输入'
        }
      }
    } else {
      // 用户名不存在
      ctx.status = 200
      ctx.body = {
        code: -1,
        message: '用户名不存在'
      }
    }
  }
}

module.exports = userController
