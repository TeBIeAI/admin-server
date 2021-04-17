const Sequelize = require('sequelize')
const { config } = require('../config')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  logging: true,
  // 设置时区
  timezone: '+08:00',
  //  connection pool
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    // 关闭 自动复数化 表名
    freezeTableName: true
  }
})



// Testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('mysql connect success!')
    sequelize.sync({ alter: true })
    console.log("所有模型均已成功同步.");
  })
  .catch(err => {
    console.error('mysql connect fail!', err)
  })

module.exports = sequelize