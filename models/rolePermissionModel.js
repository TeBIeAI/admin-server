const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('role_permission_connect', {
    roleId: {
      type: DataTypes.INTEGER
    },
    permissionId: {
      type: DataTypes.INTEGER
    }
  })
}
