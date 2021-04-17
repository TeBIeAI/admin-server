const Router = require('koa-router')
const Roles = require('../../controllers/roles')
const instance = new Roles()
const router = new Router()

router.prefix('/api/role')

router.get('/get_roles', instance.getRoles)

module.exports = router
