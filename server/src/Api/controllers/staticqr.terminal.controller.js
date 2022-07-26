const ApiError = require('../../Utils/apiError')
const staticqrTerminalService = require('../services/staticqr.terminal.service')

class StaticqrTerminalController {
    async createTerminal(req, res, next) {
        try {
            const body = req.body
            const results = await staticqrTerminalService.createTerminal(body)
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

    async getTerminals(req, res, next) {
        try {
            const results = await staticqrTerminalService.getTerminals()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getTerminalsById(req, res, next) {
        try {
            const { id } = req.params
            const results = await staticqrTerminalService.getTerminalById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateTerminalsById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const results = await staticqrTerminalService.updateTerminalById(
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

    async removeTerminals(req, res, next) {
        try {
            const { id } = req.params
            const results = await staticqrTerminalService.removeTerminal(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new StaticqrTerminalController()
