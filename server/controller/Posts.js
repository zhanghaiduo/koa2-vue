const PostsModel = require('../model/PostsModel')

class postsController {
  /**
     * 创建
     * @param ctx
     * @returns {Promise.<void>}
     */

  static async posts_create(ctx) {
    // const req = ctx.request.body
    //
  }
  /**
     * 列表
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async posts_list(ctx) {
    const dataObj = ctx.request.body
    try {
      const data = await PostsModel.getPostsList(dataObj)
      ctx.body = {
        code: 1,
        msg: '查询成功',
        data: data
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
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
  static async posts_detail(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await PostsModel.getPostsDetail(id)
        ctx.body = {
          code: 1,
          msg: '查询成功',
          data: data
        }
      } catch (err) {
        ctx.body = {
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
  static async posts_del(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await PostsModel.delPosts(id)
        ctx.body = {
          code: 1,
          msg: '删除成功',
          data: data
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: '失败'
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

module.exports = postsController
