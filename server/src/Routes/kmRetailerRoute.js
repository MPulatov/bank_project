const Router = require('express')
const router = new Router()
const KmRetailerController = require('../Api/controllers/km.retailer.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')
// const kmVerify = require('../Middleware/verify/km.verify')

// KM Retailer
router.get('/', checkAuth, KmRetailerController.getRetailers)
router.get('/:id', checkAuth, KmRetailerController.getRetailerById)
router.post(
    '/add',
    checkRoles(true),
    // kmVerify.retailerVerify,
    KmRetailerController.createRetailer
)
router.patch(
    '/update/:id',
    checkRoles(true),
    KmRetailerController.updateRetailerById
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    KmRetailerController.removeRetailer
)

module.exports = router
