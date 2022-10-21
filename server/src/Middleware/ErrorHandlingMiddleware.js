const ApiError = require('../Utils/apiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({
        // message: 'Непредеиденная ошибка!',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}
