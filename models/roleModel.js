const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('role', {
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '普通用户'
    }
  })
}
