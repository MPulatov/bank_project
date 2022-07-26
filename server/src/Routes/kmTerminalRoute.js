const Router = require('express')
const router = new Router()
const KmTerminalController = require('../Api/controllers/km.terminal.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')
const uploadFile = require('../Helper/km.file.upload')
// const kmVerify = require('../Middleware/verify/km.verify')

// KM Terminal
router.get('/', checkAuth, KmTerminalController.getTerminals)
router.get('/:id', checkAuth, KmTerminalController.getTerminalById)
router.post(
    '/add',
    checkRoles(true),
    uploadFile,
    // kmVerify.terminalVerify,
    KmTerminalController.createTerminal
)
router.patch(
    '/update/:id',
    checkRoles(true),
    uploadFile,
    KmTerminalController.updateTerminalById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    KmTerminalController.removeTerminal
)

module.exports = router
