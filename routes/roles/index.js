const Router = require('koa-router')
const Roles = require('../../controllers/roles')
const instance = new Roles()
const router = new Router()

router.prefix('/api/role')

router.get('/get_roles', instance.getRoles)
router.post('/create_role', instance.createRole)
router.post('/update_role', instance.updateRole)
router.delete('/del_role', instance.delRole)

module.exports = router
