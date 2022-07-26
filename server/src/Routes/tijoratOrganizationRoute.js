const Router = require('express')
const router = new Router()
const TijoratOrganizationController = require('../Api/controllers/tijorat.organizations.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')
const tijoratVerify = require('../Middleware/verify/tijorat.verify')

//TIJORAT Organization
router.get('/', checkAuth, TijoratOrganizationController.getOrganizations)
router.get(
    '/:id',
    checkAuth,
    TijoratOrganizationController.getOrganizationsById
)
router.post(
    '/add',
    tijoratVerify.organizationVerify,
    checkRoles(true),
    TijoratOrganizationController.createOrganization
)
router.patch(
    '/update/:id',
    checkRoles(true),
    TijoratOrganizationController.updateOrganizationsById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    TijoratOrganizationController.removeOrganizations
)

module.exports = router
