const { PermissionModel } = require('../../models')
const { SUCCESS_CODE, ERROR_CODE } = require('../../config/messageCode')

class Permission {
  async getList(ctx) {
    const { count, rows } = await PermissionModel.findAndCountAll({
      // include: {
      //   model: PermissionModel
      // }
    })

    if (rows) {
      // const result = doc.toJSON()
      // result.roles = doc.roles.map(role => role.name)

      return (ctx.body = { code: SUCCESS_CODE, count: count, data: rows, msg: '角色查询成功' })
    } else {
      return (ctx.body = { code: ERROR_CODE, msg: '查询角色失败' })
    }
  }
}

module.exports = Permission
