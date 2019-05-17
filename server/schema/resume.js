module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_copy_20181031', {
    // ID
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    // 名
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    // 岗位
    posts: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'posts'
    },
    // 岗位ID
    posts_id: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'posts_id'
    },
    // 电话
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'phone'
    },
    // 学校
    school: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'school'
    },
    // 邮箱
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'mail'
    },
    // 状态
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status'
    },
    // 得分
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'score'
    },
    // 备注
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'remark'
    },
    // 备注2
    remark2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'remark2'
    },
    // 入职背调
    background: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'background'
    },
    // 工作年限
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'experience'
    },

    // 创建时间
    read_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // 更新时间
    Interview_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    // 如果为 true 则表的名称和 model 相同，即 resume
    // 为 false MySQL创建的表名称会是复数 resumes
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })
}
