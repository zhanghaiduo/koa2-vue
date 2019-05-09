// 建立连接mysql数据库的db.js文件
const db = require('../config/db')
// Sequelize对象
const Sequelize = db.sequelize
// 数据表模型文件
const User = Sequelize.import('../schema/user')
// 自动创建表
User.sync({ force: false })

class UserModel {
  /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
  static async createUser(data) {
    // 创建用户，暂时不开放...
    // return await User.create({
    //   username: data.username, // 账号
    //   password: data.password// 密码
    // })
  }

  /**
     * 查询用户名是否存在
     * @param username  用户名
     * @returns {Promise<Model>}
     */
  static async getUserByName(username) {
    return await User.findOne({
      where: {
        username
      }
    })
  }
  /**
     * 更新数据库存放的token
     * @param id 用户ID
     */
  static async updateUserToken(id, data) {
    return await User.update(data, {
      where: {
        id
      },
      fields: ['token']//	要插入/更新字段。默认全部
    })
  }
}

module.exports = UserModel
