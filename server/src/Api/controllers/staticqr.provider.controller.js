const ApiError = require('../../Utils/apiError')
const staticqrProviderService = require('../services/staticqr.provider.service')

class StaticqrProviderController {
    async createProvider(req, res, next) {
        try {
            const body = req.body
            const results = await staticqrProviderService.createProvider(body)
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

    async getProviders(req, res, next) {
        try {
            const results = await staticqrProviderService.getProviders()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getProviderById(req, res, next) {
        try {
            const { id } = req.params
            const results = await staticqrProviderService.getProviderById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateProviderById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const results = await staticqrProviderService.updateProviderById(
                id,
                body
            )
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

    async removeProvider(req, res, next) {
        try {
            const { id } = req.params
            const results = await staticqrProviderService.removeProvider(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new StaticqrProviderController()
