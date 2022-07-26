const ApiError = require('../../Utils/apiError')
const kmTerminalPermissionService = require('../services/km.terminal.permission.service')

class KmTerminalPermissionController {
    async createTerminalPermission(req, res, next) {
        try {
            const body = req.body
            let transaction_name
            switch (body.transaction_code) {
                case '110':
                    transaction_name = 'Покупка'
                    break
                case '114':
                    transaction_name = 'Возврат товара'
                    break
                case '115':
                    transaction_name = 'Снятие наличных'
                    break
                case '117':
                    transaction_name = 'Запрос баланса'
                    break
                case '135':
                    transaction_name = 'Перевод'
                    break
                case '138':
                    transaction_name = 'Мини выпыска'
                    break
                case '140':
                    transaction_name = 'Внесение наличных'
                    break
                default:
                    return (transaction_name = '')
            }
            const results =
                await kmTerminalPermissionService.createTerminalPermission(
                    body,
                    transaction_name
                )
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

    async getTerminalsPermission(req, res, next) {
        try {
            const results =
                await kmTerminalPermissionService.getTerminalsPermission()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getTerminalPermissionById(req, res, next) {
        try {
            const { id } = req.params
            const results =
                await kmTerminalPermissionService.getTerminalPermissionById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateTerminalPermissionById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            let transaction_name
            switch (body.transaction_code) {
                case '110':
                    transaction_name = 'Покупка'
                    break
                case '114':
                    transaction_name = 'Возврат товара'
                    break
                case '115':
                    transaction_name = 'Снятие наличных'
                    break
                case '117':
                    transaction_name = 'Запрос баланса'
                    break
                case '135':
                    transaction_name = 'Перевод'
                    break
                case '138':
                    transaction_name = 'Мини выпыска'
                    break
                case '140':
                    transaction_name = 'Внесение наличных'
                    break
                default:
                    return (transaction_name = '')
            }
            const results =
                await kmTerminalPermissionService.updateTerminaPermissionlById(
                    id,
                    body,
                    transaction_name
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

    async removeTerminalPermission(req, res, next) {
        try {
            const { id } = req.params
            const results =
                await kmTerminalPermissionService.removeTerminalPermission(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new KmTerminalPermissionController()
