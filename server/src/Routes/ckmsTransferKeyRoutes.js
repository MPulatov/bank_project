const Router = require('express')
const router = new Router()
const CkmsTransferKeyController = require('../Api/controllers/ckms.transfer.keys.controller')
const checkRoles = require('../Middleware/checkRoleMiddleware')
const checkAuth = require('../Middleware/authMiddleware')

// TIJORAT Sales
router.get('/', checkAuth, CkmsTransferKeyController.getTransferKey)
router.get('/:id', checkAuth, CkmsTransferKeyController.getTransferKeyById)
router.post(
    '/add',
    checkRoles(true),
    CkmsTransferKeyController.createTransferKey
)
router.delete(
    '/remove/:id',
    checkRoles(true),
    CkmsTransferKeyController.removeTransferKey
)

module.exports = router
