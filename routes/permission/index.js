const Router = require('koa-router')
const Permission = require('../../controllers/permission')
const instance = new Permission()
const router = new Router()

router.prefix('/api/permission')

router.get('/get_list', instance.getList)

module.exports = router
