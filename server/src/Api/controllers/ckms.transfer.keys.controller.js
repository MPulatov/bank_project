const ApiError = require('../../Utils/apiError')
const ckmsTransferKeyService = require('../services/ckms.transfer.key.service')

class CkmsTransferKeyController {
    async createTransferKey(req, res, next) {
        try {
            const body = req.body
            const results = await ckmsTransferKeyService.createTransferKey(body)
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

    async getTransferKey(req, res, next) {
        try {
            const results = await ckmsTransferKeyService.getTransferKey()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getTransferKeyById(req, res, next) {
        try {
            const { id } = req.params
            const results = await ckmsTransferKeyService.getTransferKeyById(id)
            // if (!results.length) {
            //     return next(ApiError.notFound('Запись с таким ID не найдена'))
            // }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async removeTransferKey(req, res, next) {
        try {
            const { id } = req.params
            const results = await ckmsTransferKeyService.removeTransferKey(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new CkmsTransferKeyController()
