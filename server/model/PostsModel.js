// mysql数据库的db.js文件
const db = require('../config/db')
// Sequelize对象
const Sequelize = db.sequelize
// 数据表模型文件
const Posts = Sequelize.import('../schema/posts')
// 自动创建表
Posts.sync({ force: false })

class PostsModel {
  /**
     * 创建部门
     * @param data
     */
  static async createPosts(data) {
    const { name, remark } = data
    return await Posts.create({ name, remark })
  }
  /**
     * 部门列表
     * @param name //部门名称
     */
  static async getPostsList(dataObj, id, posts_id) {
    const sq = {
      where: {
        name: {
          like: '%' + (dataObj.name ? dataObj.name : '') + '%'
        }// 模糊查询
      }
    }
    if (id !== 1 && posts_id > 2) {
      sq.where.id > 1// 部门权限，过滤掉超管职位（ID1的超管忽视）
    }
    return await Posts.findAll(sq)
  }
  /**
     * 查
     * @param id
     */
  static async getPostsDetail(id) {
    return await Posts.findOne({
      where: {
        id
      }
    })
  }
  /**
     * 查询职位名是否存在
     * @param name  用户名
     * @returns {Promise<Model>}
     */
  static async getPostsByName(name) {
    return await Posts.findOne({
      where: {
        name
      }
    })
  }
  /**
     * 改
     * @param id
     */
  static async updatePosts(id, data) {
    return await Posts.update(data, {
      where: {
        id
      }
      // fields: ['token']//	要插入/更新字段。默认全部
    })
  }
  /**
     * 删
     * @param id
     */
  static async delPosts(id) {
    return await Posts.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = PostsModel
