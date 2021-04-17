const { DataTypes } = require('sequelize')
const { md5 } = require('../utils')
const bcrypt = require('bcryptjs')
const SALT_LENGTH = 10

module.exports = sequelize => {
  return sequelize.define('user', {
    avatar: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      async set(value) {
        const md5Pwd = md5(value) // md5签名
        const salt = bcrypt.genSaltSync(SALT_LENGTH) // 生成盐
        const saltPwd = bcrypt.hashSync(md5Pwd, salt, null) // 密码加盐
        this.setDataValue('password', saltPwd)
      }
    },
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '启用 1 禁用 0'
    }
  })
}
