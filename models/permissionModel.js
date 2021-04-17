const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('permission', {
    name: {
      type: DataTypes.STRING
    },
    pid: {
      type: DataTypes.STRING,
      comment: '父级菜单id'
    },
    code: {
      type: DataTypes.STRING,
      comment: '权限编码'
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: '2',
      comment: '目录 1 资源 2'
    },
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '启用 1 禁用 0'
    }
  })
}
