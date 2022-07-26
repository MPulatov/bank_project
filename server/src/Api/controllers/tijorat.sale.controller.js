const ApiError = require('../../Utils/apiError')
const tijoratSaleService = require('../services/tijorat.sale.service')

class TijoratSaleController {
    async createSale(req, res, next) {
        try {
            const body = req.body
            const results = await tijoratSaleService.createSale(body)
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

    async getSales(req, res, next) {
        try {
            const results = await tijoratSaleService.getSales()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getSalesById(req, res, next) {
        try {
            const { id } = req.params
            const results = await tijoratSaleService.getSalesById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateSalesById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const results = await tijoratSaleService.updateSalesById(id, body)
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

    async removeSales(req, res, next) {
        try {
            const { id } = req.params
            const results = await tijoratSaleService.removeSales(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new TijoratSaleController()
