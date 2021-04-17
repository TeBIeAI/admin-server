const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('user_role_connect', {
    userId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    }
  })
}
