// mysql数据库的db.js文件
const db = require('../config/db')
// Sequelize对象
const Sequelize = db.sequelize
// 数据表模型文件
const Resume = Sequelize.import('../schema/resume')
// 自动创建表
Resume.sync({ force: false })

class ResumeModel {
  /**
     * 创建
     * @param data
     */
  static async createResume(data) {
    const { name, posts_id, phone, school, mail, status, score, remark, read_time, Interview_time, remark2, posts } = data
    return await Resume.create({ name, posts_id, phone, school, mail, status, score, remark, read_time, Interview_time, remark2, posts })
  }
  /**
     * 列表
     * @param name
     */
  static async getResumeList(dataObj, id, posts_id) {
    const sq = {
      where: {
        name: {
          like: '%' + dataObj.name + '%'
        } // 模糊查询
      },
      order: [
        ['id', 'DESC'] // 排序
      ],
      'limit': dataObj.pageSize * 1, // 每页多少条
      'offset': dataObj.pageSize * (dataObj.currentPage - 1) // 跳过多少条
    }
    if (id !== 1) {
      sq.where.posts_id = posts_id// 部门权限，过滤掉职位（ID1的超管忽视）
    }
    return await Resume.findAndCountAll(sq)
  }

  /**
     * 详情
     * @param id
     */
  static async getResumeDetail(id) {
    return await Resume.findOne({
      where: {
        id
      }
    })
  }
  /**
     * 改
     * @param id
     */
  static async updateResume(id, data) {
    return await Resume.update(data, {
      where: {
        id
      }
    // fields: ['read_time', 'Interview_time']//	要插入/更新字段。默认全部
    })
  }
  /**
     * 删除
     * @param id
     */
  static async delResume(id) {
    return await Resume.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = ResumeModel
