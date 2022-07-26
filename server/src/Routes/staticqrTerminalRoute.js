const Router = require('express')
const router = new Router()
const StaticqrTerminalController = require('../Api/controllers/staticqr.terminal.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')

// Static Terminal
router.get('/', checkAuth, StaticqrTerminalController.getTerminals)
router.get('/:id', checkAuth, StaticqrTerminalController.getTerminalsById)
router.post('/add', checkRoles(true), StaticqrTerminalController.createTerminal)
router.patch(
    '/update/:id',
    checkRoles(true),
    StaticqrTerminalController.updateTerminalsById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    StaticqrTerminalController.removeTerminals
)

module.exports = router
