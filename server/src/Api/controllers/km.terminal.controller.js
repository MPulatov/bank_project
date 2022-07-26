const ApiError = require('../../Utils/apiError')
const kmTerminalService = require('../services/km.terminal.service')
const { createHmac, randomBytes, createHash } = require('crypto')
const { readFileSync } = require('fs')

class KmTerminalController {
    async createTerminal(req, res, next) {
        try {
            const body = req.body
            const term_qr_data = readFileSync(req.file.path)
            let hash = createHmac(
                'sha256',
                req.body.active_code,
                req.body.terminal_name,
                req.body.devicesn
            )
                .update(req.body.active_code)
                .digest('hex')
            const active_code = (req.body.active_code = hash)

            let salt = randomBytes(16).toString('base64')
            const active_api_hash = createHash('sha256', salt, new Date())
                .update(req.body.active_code)
                .digest('hex')
            const api_key = (req.body.active_code = active_api_hash)
            const currency = '972'
            const results = await kmTerminalService.createTerminal(
                body,
                term_qr_data,
                active_code,
                api_key,
                currency
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

    async getTerminals(req, res, next) {
        try {
            const results = await kmTerminalService.getTerminals()
            if (!results.length) {
                return next(ApiError.notFound('Нет записи'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async getTerminalById(req, res, next) {
        try {
            const { id } = req.params
            const results = await kmTerminalService.getTerminalById(id)
            if (!results.length) {
                return next(ApiError.notFound('Запись с таким ID не найдена'))
            }
            return res.status(200).json(results)
        } catch (error) {
            return next(error)
        }
    }

    async updateTerminalById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const term_qr_data = readFileSync(req.file.path)
            const results = await kmTerminalService.updateTerminalById(
                id,
                body,
                term_qr_data
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

    async removeTerminal(req, res, next) {
        try {
            const { id } = req.params
            const results = await kmTerminalService.removeTerminal(id)
            if (!results.affectedRows) {
                return next(ApiError.badRequest('Не удалось успешно удалит'))
            }
            return res.status(200).json({ message: 'Запись успешно удален' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new KmTerminalController()
