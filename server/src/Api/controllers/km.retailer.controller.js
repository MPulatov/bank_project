const ApiError = require('../../Utils/apiError')
const kmRetailerService = require('../services/km.retailer.service')

class KmRetailerController {
    async createRetailer(req, res, next) {
        try {
            const body = req.body
            const results = await kmRetailerService.createRetailer(body)
            if (!results.affectedRows) {
                return next(ApiError.internal('Что-то пошло не так'))
            }
            return res
                .status(201)
                .json({ message: 'Данный объект был создан успешно' })
        } catch (error) {
            return next(error)
        }
    }

    async getRetailers(req, res, next) {
        try {
            const results = await kmRetailerService.getRetailers()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getRetailerById(req, res, next) {
        try {
            const { id } = req.params
            const results = await kmRetailerService.getRetailerById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateRetailerById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const results = await kmRetailerService.updateRetailerById(id, body)
            if (!results.affectedRows) {
                return next(
                    ApiError.badRequest('Не удалось успешно обновить запись')
                )
            }
            return res.status(200).json({ message: 'Запись успешно обновлена' })
        } catch (error) {
            return next(error)
        }
    }

    async removeRetailer(req, res, next) {
        try {
            const { id } = req.params
            const results = await kmRetailerService.removeRetailer(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new KmRetailerController()
