// 建立连接mysql数据库的db.js文件
const db = require('../config/db')
// Sequelize对象
const Sequelize = db.sequelize
// 数据表模型文件
const Account = Sequelize.import('../schema/account')
// 自动创建表
Account.sync({ force: false })

class AccountModel {
  /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
  static async createAccount(data) {
    const { username, password, name, posts_id } = data
    return await Account.create({ username, password, name, posts_id })
  }
  /**
     * 查列表
     * @param title
     */
  static async getAccountList(dataObj) {
    console.log(dataObj)
    return await Account.findAndCountAll({
      where: {
        name: {
          like: '%' + dataObj.name + '%'
        }// 模糊查询
      },
      'limit': dataObj.pageSize * 1, // 每页多少条
      'offset': dataObj.pageSize * (dataObj.currentPage - 1) // 跳过多少条
    })
  }
  /**
     * 查询用户名是否存在
     * @param username  用户名
     * @returns {Promise<Model>}
     */
  static async getAccountByName(username) {
    return await Account.findOne({
      where: {
        username
      }
    })
  }
  /**
     * 删
     * @param id
     */
  static async delAccount(id) {
    return await Account.destroy({
      where: {
        id
      }
    })
  }
  /**
     * 改
     * @param id 用户ID
     */
  static async updateAccount(id, data) {
    return await Account.update(data, {
      where: {
        id
      }
      // fields: ['token']//	要插入/更新字段。默认全部
    })
  }
}

module.exports = AccountModel
