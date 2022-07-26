const Router = require('express')
const router = new Router()
const CkmsPosRequestController = require('../Api/controllers/ckms.pos.request.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')

// TIJORAT Sales
router.get('/', checkAuth, CkmsPosRequestController.getPosRequests)
router.get('/:id', checkAuth, CkmsPosRequestController.getPosRequestById)
router.post('/add', checkRoles(true), CkmsPosRequestController.createPosRequest)
router.delete(
    '/remove/:id',
    checkRoles(true),
    CkmsPosRequestController.removePosRequest
)

module.exports = router
