const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const { md5 } = require('../../utils')
const { UserModel, RoleModel, UserRoleModel } = require('../../models')
const { generateToken } = require('../../utils/jwt')
const { SUCCESS_CODE, ERROR_CODE } = require('../../config/messageCode')

class User {
  async login(ctx) {
    const { username, password } = ctx.request.body
    const doc = await UserModel.findOne({
      where: {
        username
      }
    })
    if (!doc) {
      return (ctx.body = { code: -1, msg: '该账号不存在' })
    }
    const md5Pwd = md5(password) // md5签名
    // 数据库存储的是 md5Pwd 加盐生成的密码
    // 将 md5Pwd 与 数据库 加盐生成的 user.password 比较
    const passed = await bcrypt.compare(md5Pwd, doc.password)
    if (!passed) {
      return (ctx.body = { code: -1, msg: '密码错误' })
    }

    const payload = {
      username,
      id: doc.id
    }
    const token = generateToken(payload)
    return (ctx.body = {
      code: 200,
      data: {
        token
      }
    })
  }

  async userinfo(ctx) {
    const { username } = ctx.state.user
    const doc = await UserModel.findOne({
      where: {
        username
      },
      attributes: ['id', 'createdAt', 'enable', 'username'],
      include: [
        {
          model: RoleModel,
          through: {
            attributes: []
          },
          attributes: ['id', 'role']
        }
      ]
    })

    if (doc) {
      const result = doc.toJSON()
      result.role = doc.roles.map(role => role.role)

      return (ctx.body = { code: SUCCESS_CODE, data: result, msg: '查询用户成改' })
    } else {
      return (ctx.body = { code: ERROR_CODE, msg: '用户不存在' })
    }
  }

  async createUser(ctx) {
    const params = ctx.request.body
    const doc = await UserModel.findOne({
      where: {
        username: params.username
      }
    })
    if (doc) {
      return (ctx.body = { code: -200, msg: '该账号已存在' })
    }
    await UserModel.create({
      ...params
    })
  }

  async getUsers(ctx) {
    let { page, pageSize, username, role } = ctx.query
    pageSize = pageSize || 5
    page = page || 1
    const userWhere = {}
    const roleWhere = {}

    if (username) {
      userWhere.userName = {
        [Op.like]: '%' + username + '%'
      }
    }
    if (role) {
      roleWhere.role = role
    }

    const params = {
      where: userWhere,
      attributes: ['id', 'createdAt', 'enable', 'username'],
      include: [
        {
          model: RoleModel,
          through: {
            attributes: []
          },
          attributes: ['role'],
          where: roleWhere
        }
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize
    }

    let [count] = await Promise.all([UserModel.findAndCountAll(params)])
    const total = count.count
    let rows = count.rows
    console.log(111111, rows)

    // let { count, rows } = await UserModel.findAndCountAll({
    //   attributes: ['id', 'createdAt', 'enable', 'username'],
    //   include: [
    //     {
    //       model: RoleModel,
    //       through: {
    //         attributes: []
    //       },
    //       attributes: ['role'],
    //       where: {
    //         role: {
    //           [Op.like]: `%${params.role}%`
    //         }
    //       }
    //     }
    //   ],
    //   limit: pageSize,
    //   offset: (page - 1) * pageSize
    // })
    rows = JSON.parse(JSON.stringify(rows))
    rows = rows.map(user => {
      user.role = user.roles.length ? user.roles[0].role : 'user'
      return user
    })
    return (ctx.body = { code: SUCCESS_CODE, count: total, data: rows, msg: '获取用户列表成功' })
  }

  async updateUser(ctx) {
    const { id, enable, password, role, username } = ctx.request.body
    try {
      if (id) {
        await UserModel.update(
          {
            username,
            enable,
            role
          },
          {
            where: { id }
          }
        )
        if (role) {
          await UserRoleModel.update(
            {
              roleId: role
            },
            {
              where: {
                userId: id
              }
            }
          )
        }
        return (ctx.body = {
          code: SUCCESS_CODE,
          msg: '操作成功'
        })
      } else {
        const user = await UserModel.findOne({ where: { username } })
        if (user)
          return (ctx.body = {
            code: ERROR_CODE,
            msg: '用户已存在'
          })
        const users = await UserModel.create({
          enable,
          password,
          username
        })
        await UserRoleModel.create({
          userId: users.id,
          roleId: role || 2
        })
        return (ctx.body = {
          code: SUCCESS_CODE,
          msg: '操作成功'
        })
      }
    } catch (error) {
      ctx.body = {
        code: ERROR_CODE,
        msg: '操作失败'
      }
    }
  }

  async delUser(ctx) {
    const { id } = ctx.query
    if (id == 1) {
      return (ctx.body = {
        code: ERROR_CODE,
        msg: '不能删除admin超级管理员'
      })
    }
    try {
      await UserModel.destroy({
        where: { id }
      })
      await UserRoleModel.destroy({ where: { userId: id } })
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

module.exports = User
