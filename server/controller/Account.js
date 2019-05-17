const AccountModel = require('../model/AccountModel')
// 引入创建token的方法
const createToken = require('../token/createToken')
const PostsModel = require('../model/PostsModel')// 查职位
class accountController {
  /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
  // static 静态方法 不会被实例继承，而是直接通过类来调用
  static async account_create(ctx) {
    const data = ctx.request.body
    const n = await AccountModel.getAccountByName(data.username)
    if (!n) {
      try {
        const p = await PostsModel.getPostsDetail(data.posts_id)
        data.posts = p.name
        await AccountModel.createAccount(data)
        ctx.body = {
          code: 1,
          msg: '创建成功'
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          data: err,
          msg: '创建失败'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '账号已存在'
      }
    }
  }

  /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async login(ctx) {
    const { username, password } = ctx.request.body
    const doc = await AccountModel.getAccountByName(username)
    if (doc) {
      if (doc.password === password) {
        const token = createToken(doc)
        // 更新 用户数据库的token
        // await AccountModel.updateAccountToken(doc.id, { token })
        ctx.status = 200
        ctx.body = {
          code: 1,
          msg: '登录成功',
          token: token, // 用户的token信息
          username: doc.username, // 登录的用户名
          name: doc.name,
          posts: doc.posts,
          posts_id: doc.posts_id,
          id: doc.id
        }
      } else {
        // 用户名不存在
        ctx.status = 200
        ctx.body = {
          code: -1,
          msg: '密码错误，请重新输入'
        }
      }
    } else {
      // 用户名不存在
      ctx.status = 200
      ctx.body = {
        code: -1,
        msg: '用户名不存在'
      }
    }
    /**
     * 列表
     * @param ctx
     * @returns {Promise.<void>}
     */
  }
  static async account_list(ctx) {
    const dataObj = ctx.request.body
    try {
      const data = await AccountModel.getAccountList(dataObj)
      ctx.body = {
        code: 1,
        msg: '查询成功',
        data: data
      }
    } catch (err) {
      ctx.body = {
        data: err,
        code: -1,
        msg: '无数据'
      }
    }
  }
  /**
     * 查
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async account_detail(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await AccountModel.getAccountDetail(id)
        ctx.body = {
          code: 1,
          msg: '查询成功',
          data: data
        }
      } catch (err) {
        ctx.body = {
          data: err,
          code: -1,
          msg: '无数据'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'id必传'
      }
    }
  }
  /**
     * 删
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async account_del(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        await AccountModel.delAccount(id)
        ctx.body = {
          code: 1,
          msg: '删除成功'
        }
      } catch (err) {
        ctx.body = {
          data: err,
          code: -1,
          msg: '删除失败'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'id必传'
      }
    }
  }
  /**
     * 改
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async account_update(ctx) {
    const data = ctx.request.body
    const p = await PostsModel.getPostsDetail(data.posts_id)
    data.posts = p.name
    if (data.id) {
      try {
        await AccountModel.updateAccount(data.id, data)
        ctx.body = {
          code: 1,
          msg: '更新成功'
        }
      } catch (err) {
        ctx.body = {
          data: err,
          code: -1,
          msg: '更新失败'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'id必传'
      }
    }
  }
}

module.exports = accountController
