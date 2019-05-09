// mysql数据库的db.js文件
const db = require('../config/db')
// Sequelize对象
const Sequelize = db.sequelize
// 数据表模型文件
const Article = Sequelize.import('../schema/article')
// 自动创建表
Article.sync({ force: false })

class ArticleModel {
  /**
     * 创建文章
     * @param data
     */
  static async createArticle(data) {
    // const { title, author, content, type } = data
    // return await Article.create({ title, author, content, type })
  }
  /**
     * 文章列表
     * @param title
     */
  static async getArticleList(dataObj) {
    console.log(dataObj)
    return await Article.findAndCountAll({
      where: {
        title: {
          like: '%' + dataObj.title + '%'
        }// 模糊查询
      },
      'limit': dataObj.pageSize * 1, // 每页多少条
      'offset': dataObj.pageSize * (dataObj.currentPage - 1) // 跳过多少条
    })
  }
  /**
     * 文章详情
     * @param id
     */
  static async getArticleDetail(id) {
    return await Article.findOne({
      where: {
        id
      }
    })
  }
  /**
     * 改文章
     * @param id
     */
  static async updateArticle(id, data) {
    return await Article.destroy({
      where: {
        id
      }
      // fields: ['token']//	要插入/更新字段。默认全部
    })
  }
  /**
     * 删除文章
     * @param id
     */
  static async delArticle(id) {
    return await Article.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = ArticleModel
