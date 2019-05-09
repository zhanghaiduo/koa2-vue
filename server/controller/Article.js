const ArticleModel = require('../model/ArticleModel')

class articleController {
  /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */

  static async article_create(ctx) {
    // const req = ctx.request.body
    //
  }
  /**
     * 文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async article_list(ctx) {
    const dataObj = ctx.request.body
    try {
      const data = await ArticleModel.getArticleList(dataObj)
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
     * 文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async article_detail(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await ArticleModel.getArticleDetail(id)
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
     * 删除
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async article_del(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await ArticleModel.delArticle(id)
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

module.exports = articleController
