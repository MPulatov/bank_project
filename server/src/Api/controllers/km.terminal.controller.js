const ApiError = require('../../Utils/apiError')
const kmTerminalService = require('../services/km.terminal.service')
const { createHmac, randomBytes, createHash } = require('crypto')
const { readFileSync } = require('fs')

class KmTerminalController {
    async createTerminal(req, res, next) {
        try {
            const body = req.body
            const currency = '972'
            // Get real time
            const time = Math.floor(new Date().getTime() / 1000)
            // Uploading QR Base64 toString
            const base64data = readFileSync(req.file.path)
            let term_qr_data = base64data.toString('base64')

            // Hashing values Active code
            const active_code_hash = crypto
                .createHmac('sha256', body.terminal_name + body.devicesn)
                .update(body.active_code)
                .digest('hex')

            // Hashing Active api
            const active_api_hash = crypto
                .createHash('sha256')
                .update(body.active_code + time)
                .digest('hex')

            const results = await kmTerminalService.createTerminal(
                body,
                term_qr_data,
                active_code_hash,
                active_api_hash,
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
            const u8 = new Uint8Array(results[0].term_qr_data)
            const b64 = Buffer.from(u8).toString('ascii')
            return res.status(200).json({ results: { data: results, b64 } })
        } catch (error) {
            return next(error)
        }
    }

    async updateTerminalById(req, res, next) {
        try {
            const body = req.body
            const { id } = req.params
            const base64data = readFileSync(req.file.path)
            let term_qr_data = base64data.toString('base64')
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
