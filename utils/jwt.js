const jwt = require('jsonwebtoken')
const { privateKey } = require('../config')

// 生成 token
function generateToken(payload) {
  return jwt.sign(payload, privateKey, {
    expiresIn: '3d'
  })
}

// 验证 token
function verifyToken(token) {
  // 异步写法
  // jwt.verify(token, privateKey, { algorithm: 'RS256' }, (err, decoded) => {
  //   fn(err, decoded)
  // })
  // 同步写法
  return jwt.verify(token, privateKey, { algorithm: 'RS256' })
}

module.exports = {
  generateToken,
  verifyToken
}