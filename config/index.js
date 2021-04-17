const config = {
  host: 'localhost', //主机名
  database: 'hc_admin', //使用的哪个数据库名
  username: 'root',//账号
  password: 'root',//密码
  port: 3306, //端口号，mysql默认3306
}

const privateKey = 'This is jwt secret'

module.exports = { config, privateKey };