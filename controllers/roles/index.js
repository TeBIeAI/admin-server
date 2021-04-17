const bcrypt = require('bcryptjs');
const { md5 } = require('../../utils')
const { RoleModel, UserRoleModel } = require('../../models')
const { generateToken } = require('../../utils/jwt')
const { SUCCESS_CODE, ERROR_CODE } = require('../../config/messageCode')
const SALT_LENGTH = 10

class Roles {

  async getRoles(ctx) {
    const { count, rows } = await RoleModel.findAndCountAll()

    if (rows) {
      // const result = doc.toJSON()
      // result.roles = doc.roles.map(role => role.name)

      return ctx.body = { code: SUCCESS_CODE, count: count, data: rows, msg: '角色查询成功' }
    } else {
      return ctx.body = { code: ERROR_CODE, msg: '查询角色失败' }
    }
  }

}

module.exports = Roles