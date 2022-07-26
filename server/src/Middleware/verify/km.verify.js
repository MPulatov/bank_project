const ApiError = require('../../Utils/apiError')
const kmValidation = require('../validation/km.validation')

class verifyKM {
    async retailerVerify(req, res, next) {
        const value = kmValidation.km_retailer.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }

    async terminalVerify(req, res, next) {
        const value = kmValidation.km_terminals.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }

    async terminalPermissionVerify(req, res, next) {
        const value = kmValidation.km_terminal_permission.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }
}

module.exports = new verifyKM()
