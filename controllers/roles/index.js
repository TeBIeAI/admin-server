const { RoleModel, PermissionModel, RolePermissionModel } = require('../../models')
const { SUCCESS_CODE, ERROR_CODE } = require('../../config/messageCode')

class Roles {
  async getRoles(ctx) {
    const { count, rows } = await RoleModel.findAndCountAll({
      include: {
        model: PermissionModel
      }
    })

    if (rows) {
      // const result = doc.toJSON()
      // result.roles = doc.roles.map(role => role.name)

      return (ctx.body = { code: SUCCESS_CODE, count: count, data: rows, msg: '角色查询成功' })
    } else {
      return (ctx.body = { code: ERROR_CODE, msg: '查询角色失败' })
    }
  }

  async createRole(ctx) {
    const { name, des, roles } = ctx.request.body
    const res = await RoleModel.create({
      role: name,
      description: des
    })
    console.log(9999999999, res)
    if (roles) {
      const relations = roles.map(id => ({
        roleId: res.id,
        permissionId: id
      }))
      await RolePermissionModel.bulkCreate(relations)
    }
    ctx.body = {
      code: SUCCESS_CODE,
      msg: '添加用户成功'
    }
  }

  async updateRole(ctx) {
    const { id, name, des, roles } = ctx.request.body

    let res = await RoleModel.findOne({ where: { id } })
    await RoleModel.update(
      {
        role: name,
        description: des
      },
      { where: { id } }
    )
    if (roles) {
      await RolePermissionModel.destroy({
        where: {
          roleId: id
        }
      })
      const relations = roles.map(id => ({
        roleId: res.id,
        permissionId: id
      }))
      await RolePermissionModel.bulkCreate(relations)
    }
    ctx.body = {
      code: SUCCESS_CODE,
      msg: '更新用户成功'
    }
  }

  async delRole(ctx) {
    const { id } = ctx.query
    if (id === 1) {
      return (ctx.body = {
        code: ERROR_CODE,
        msg: '不能删除admin超级管理员'
      })
    }
    try {
      await RoleModel.destroy({
        where: { id }
      })
      await RolePermissionModel.destroy({ where: { roleId: id } })
      return (ctx.body = {
        code: SUCCESS_CODE,
        msg: '删除用户成功'
      })
    } catch (error) {
      return (ctx.body = {
        code: ERROR_CODE,
        msg: '操作异常'
      })
    }
  }
}

module.exports = Roles
