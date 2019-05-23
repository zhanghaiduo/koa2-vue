const Sequelize = require('sequelize')

const sequelize = new Sequelize('数据库名', '账号', '密码', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: true,
  // 'define': {
  //   'timestamps': false // 去除createAt updateAt
  // },
  dialectOptions: {
    // 字符集
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00' // 东八时区
})

module.exports = {
  sequelize
}
