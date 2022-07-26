const Router = require('express')
const router = new Router()
const userController = require('../Api/controllers/userController')
const authMiddleware = require('../Middleware/authMiddleware')
// const checkRoles = require('../Middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
