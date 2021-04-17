const sequelize = require('../db')

const UserModel = require('./userModel')(sequelize)
const RoleModel = require('./roleModel')(sequelize)
const PermissionModel = require('./permissionModel')(sequelize)
const RolePermissionModel = require('./rolePermissionModel')(sequelize)
const UserRoleModel = require('./userRoleModel')(sequelize)

UserModel.belongsToMany(RoleModel, { through: UserRoleModel })
RoleModel.belongsToMany(UserModel, { through: UserRoleModel })

RoleModel.belongsToMany(PermissionModel, { through: RolePermissionModel })
PermissionModel.belongsToMany(RoleModel, { through: RolePermissionModel })

module.exports = {
  RoleModel,
  UserModel,
  PermissionModel,
  RolePermissionModel,
  UserRoleModel
}
