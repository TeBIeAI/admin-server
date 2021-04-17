const Router = require('koa-router')
const User = require('../../controllers/user')
const instance = new User()
const router = new Router()

router.prefix('/api/user')

router.post('/login', instance.login)
router.post('/register', instance.createUser)
router.get('/userinfo', instance.userinfo)
router.get('/get_users', instance.getUsers)
router.post('/update_user', instance.updateUser)
router.delete('/del_user', instance.delUser)

module.exports = router
