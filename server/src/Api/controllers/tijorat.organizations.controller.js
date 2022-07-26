const ApiError = require('../../Utils/apiError')
const tijoratOrganizationService = require('../services/tijorat.organization.service')

class TijoratOrganizationController {
    async createOrganization(req, res, next) {
        try {
            const body = req.body
            const results = await tijoratOrganizationService.createOrganization(
                body
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

    async getOrganizations(req, res, next) {
        try {
            const { results } =
                await tijoratOrganizationService.getOrganizations()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getOrganizationsById(req, res, next) {
        try {
            const { id } = req.params
            const results =
                await tijoratOrganizationService.getOrganizationById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateOrganizationsById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const results =
                await tijoratOrganizationService.updateOrganizationById(
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

    async removeOrganizations(req, res, next) {
        try {
            const { id } = req.params
            const results = await tijoratOrganizationService.removeOrganization(
                id
            )
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new TijoratOrganizationController()
