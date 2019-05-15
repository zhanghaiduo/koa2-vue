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
    // const { title, author, content, type } = data
    // return await Posts.create({ title, author, content, type })
  }
  /**
     * 部门列表
     * @param name //部门名称
     */
  static async getPostsList(dataObj) {
    console.log(dataObj)
    return await Posts.findAll({
      where: {
        name: {
          like: '%' + (dataObj.name ? dataObj.name : '') + '%'
        }// 模糊查询
      }
    })
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
     * 改
     * @param id
     */
  static async updatePosts(id, data) {
    return await Posts.destroy({
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
