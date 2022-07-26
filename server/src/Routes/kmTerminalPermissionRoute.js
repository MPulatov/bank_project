const Router = require('express')
const router = new Router()
const KmTerminalPermissionController = require('../Api/controllers/km.terminal.permission.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')
const kmVerify = require('../Middleware/verify/km.verify')

// KM Terminal Permission
router.get(
    '/',
    checkAuth,
    KmTerminalPermissionController.getTerminalsPermission
)
router.get(
    '/:id',
    checkAuth,
    KmTerminalPermissionController.getTerminalPermissionById
)
router.post(
    '/add',
    checkRoles(true),
    kmVerify.terminalPermissionVerify,
    KmTerminalPermissionController.createTerminalPermission
)
router.patch(
    '/update/:id',
    checkRoles(true),
    KmTerminalPermissionController.updateTerminalPermissionById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    KmTerminalPermissionController.removeTerminalPermission
)

module.exports = router
