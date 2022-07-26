const ApiError = require('../../Utils/apiError')
const tijoratValidation = require('../validation/tijorat.validation')

class verifyTijorat {
    async organizationVerify(req, res, next) {
        const value = tijoratValidation.tijorat_organization.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }

    async saleVerify(req, res, next) {
        const value = tijoratValidation.tijorat_sale.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }

    async userVerify(req, res, next) {
        const value = tijoratValidation.tijorat_users.validate(req.body)
        if (value.error) {
            return next(ApiError.badRequest(value.error.details[0].message))
        } else {
            next()
        }
    }
}

module.exports = new verifyTijorat()
