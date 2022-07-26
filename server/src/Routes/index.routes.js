const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const tijoratUserRouter = require('./tijoratUserRoute')
const tijoratSaleRouter = require('./tijoratSaleRoute')
const tijoratOrganizationRouter = require('./tijoratOrganizationRoute')
const staticqrTerminalRouter = require('./staticqrTerminalRoute')
const staticqrProviderRouter = require('./staticqrProviderRoute')
const kmTerminalRouter = require('./kmTerminalRoute')
const kmTerminalPermissionRouter = require('./kmTerminalPermissionRoute')
const kmRetailerRouter = require('./kmRetailerRoute')
const ckmsPosRequestRouter = require('./ckmsPosRequestRoute')
const ckmsTransferKeyRouter = require('./ckmsTransferKeyRoutes')

router.use('/user', userRouter)
router.use('/favri/users', tijoratUserRouter)
router.use('/favri/sales', tijoratSaleRouter)
router.use('/favri/organization', tijoratOrganizationRouter)
router.use('/terminals', staticqrTerminalRouter)
router.use('/provider', staticqrProviderRouter)
router.use('/favri/terminal', kmTerminalRouter)
router.use('/terminal/permission', kmTerminalPermissionRouter)
router.use('/retailers', kmRetailerRouter)
router.use('/posrequests', ckmsPosRequestRouter)
router.use('/transfer/key', ckmsTransferKeyRouter)

module.exports = { router }
