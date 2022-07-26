const Router = require('express')
const router = new Router()
const TijoratSaleController = require('../Api/controllers/tijorat.sale.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')
const tijoratVerify = require('../Middleware/verify/tijorat.verify')

// TIJORAT Sales
router.get('/', checkAuth, TijoratSaleController.getSales)
router.get('/:id', checkAuth, TijoratSaleController.getSalesById)
router.post(
    '/add',
    checkRoles(true),
    tijoratVerify.saleVerify,
    TijoratSaleController.createSale
)
router.patch(
    '/update/:id',
    checkRoles(true),
    TijoratSaleController.updateSalesById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    TijoratSaleController.removeSales
)

module.exports = router
