const Router = require('express')
const router = new Router()
const TijoratUserController = require('../Api/controllers/tijorat.user.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')
const tijoratVerify = require('../Middleware/verify/tijorat.verify')

// TIJORAT Users
router.get('/', checkAuth, TijoratUserController.getUsers)
router.get('/:id', checkAuth, TijoratUserController.getUserById)
router.post(
    '/add',
    checkRoles(true),
    tijoratVerify.userVerify,
    TijoratUserController.createUser
)
router.patch(
    '/update/:id',
    checkRoles(true),
    TijoratUserController.updateUserById
)
router.delete('/remove/:id', checkRoles(true), TijoratUserController.removeUser)

module.exports = router
