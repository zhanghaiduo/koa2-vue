const ResumeModel = require('../model/ResumeModel')
const getToken = require('../token/getToken')
const PostsModel = require('../model/PostsModel')// 查职位
class resumeController {
  /**
     * 创建
     * @param ctx
     * @returns {Promise.<void>}
     */

  static async resume_create(ctx) {
    const data = ctx.request.body
    try {
      const p = await PostsModel.getPostsDetail(data.posts_id)
      data.posts = p.name
      await ResumeModel.createResume(data)
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
  }
  /**
     * 列表
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async resume_list(ctx) {
    const tokenContent = await getToken(ctx)
    const dataObj = ctx.request.body
    try {
      const data = await ResumeModel.getResumeList(dataObj, tokenContent.id, tokenContent.posts_id)
      ctx.body = {
        code: 1,
        msg: '查询成功',
        data: data
      }
    } catch (err) {
      ctx.body = {
        data: err,
        code: -1,
        msg: '查询失败'
      }
    }
  }
  /**
     * 查详情
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async resume_detail(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await ResumeModel.getResumeDetail(id)
        ctx.body = {
          code: 1,
          msg: '查询成功',
          data: data
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          data: err,
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
  static async resume_del(ctx) {
    const id = ctx.request.body.id
    if (id) {
      try {
        const data = await ResumeModel.delResume(id)
        ctx.body = {
          code: 1,
          msg: '删除成功',
          data: data
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          data: err,
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
  /**
     * 改
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async resume_update(ctx) {
    const data = ctx.request.body
    if (data.id) {
      try {
        const p = await PostsModel.getPostsDetail(data.posts_id)
        data.posts = p.name
        await ResumeModel.updateResume(data.id, data)
        ctx.body = {
          code: 1,
          msg: '更新成功'
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          data: err,
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

module.exports = resumeController
