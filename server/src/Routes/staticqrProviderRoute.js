const Router = require('express')
const router = new Router()
const StaticqrProviderController = require('../Api/controllers/staticqr.provider.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')

// Static Provider
router.get('/', checkAuth, StaticqrProviderController.getProviders)
router.get('/:id', checkAuth, StaticqrProviderController.getProviderById)
router.post('/add', checkRoles(true), StaticqrProviderController.createProvider)
router.patch(
    '/update/:id',
    checkRoles(true),
    StaticqrProviderController.updateProviderById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    StaticqrProviderController.removeProvider
)

module.exports = router
