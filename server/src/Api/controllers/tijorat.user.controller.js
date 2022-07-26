const ApiError = require('../../Utils/apiError')
const tijoratUserService = require('../services/tijorat.user.service')

class TijoratUserController {
    async createUser(req, res, next) {
        try {
            const body = req.body
            const results = await tijoratUserService.createUser(body)
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

    async getUsers(req, res, next) {
        try {
            const results = await tijoratUserService.getUsers()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params
            const results = await tijoratUserService.getUsersById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateUserById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const results = await tijoratUserService.updateUserById(id, body)
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

    async removeUser(req, res, next) {
        try {
            const { id } = req.params
            const results = await tijoratUserService.removeUser(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new TijoratUserController()
