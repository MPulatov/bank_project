const ApiError = require('../../Utils/apiError')
const staticqrValidation = require('../validation/staticqr.validation')

class verifyStaticqr {
    async providerVerify(req, res, next) {
        const value = staticqrValidation.staticqr_provider.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }

    async terminalVerify(req, res, next) {
        const value = staticqrValidation.staticqr_terminal.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }
}

module.exports = new verifyStaticqr()
