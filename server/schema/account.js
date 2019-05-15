const moment = require('moment')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    // ID
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    // 用户名
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    // 密码
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    // 姓名
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    // 部门
    posts: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'posts'
    },
    // 部门ID
    posts_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'posts_id'
    },
    // token
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'token'
    },
    // 创建时间
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    // 更新时间
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })
}
