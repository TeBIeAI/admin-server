const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaJwt = require('koa-jwt') //路由权限控制
const { privateKey } = require('./config')
const jwt = require('jsonwebtoken')

const users = require('./routes/user')
const roles = require('./routes/roles')

// error handler
onerror(app)

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE,PATCH')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization')
  if (ctx.method === 'OPTIONS' || ctx.url === '/favicon.ico') {
    ctx.status = 200
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  const token = ctx.header.authorization
  const decoded = jwt.decode(token)
  ctx.state.user = decoded
  await next()
})

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

app.use(
  koaJwt({
    secret: privateKey,
    getToken: ctx => {
      // 自定义返回，默认的 token 为 'Bearer <token>'
      const token = ctx.query.Authorization || ctx.headers.authorization
      return token
    }
  }).unless({
    path: [/^\/api\/user\/login/]
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
