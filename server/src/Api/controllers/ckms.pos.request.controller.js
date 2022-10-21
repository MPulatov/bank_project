const ApiError = require('../../Utils/apiError')
const ckmsPosRequestService = require('../services/ckms.pos.request.service')

class CkmsPosRequestController {
    async createPosRequest(req, res, next) {
        try {
            const body = req.body
            const results = await ckmsPosRequestService.createPosRequest(body)
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

    async getPosRequests(req, res, next) {
        try {
            const results = await ckmsPosRequestService.getPosRequests()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getPosRequestById(req, res, next) {
        try {
            const { id } = req.params
            const results = await ckmsPosRequestService.getPosRequestById(id)
            // if (!results.length) {
            //     return next(ApiError.notFound('Запись с таким ID не найдена'))
            // }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async removePosRequest(req, res, next) {
        try {
            const { id } = req.params
            const results = await ckmsPosRequestService.removePosRequest(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new CkmsPosRequestController()
