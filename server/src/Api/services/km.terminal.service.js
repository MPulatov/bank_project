const { poolKM } = require('../../Config/Database')

class KmTermianlService {
    createTerminal(
        data,
        term_qr_data,
        active_code_hash,
        active_api_hash,
        currency
    ) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT term_id, terminal_name FROM terminals WHERE terminal_name = ?`
            const sqlDevice = `SELECT devicesn FROM terminals WHERE devicesn = ?`
            poolKM.query(sql, [data.terminal_name], (err, rows) => {
                if (err) return reject(err)

                const terminalName = rows.find(
                    (item) => item.terminal_name === data.terminal_name
                )

                if (!terminalName) {
                    poolKM.query(sqlDevice, [data.devicesn], (err, rows) => {
                        if (err) return reject(err)

                        const deviceSn = rows.find(
                            (device) => device.devicesn === data.devicesn
                        )

                        if (!deviceSn) {
                            poolKM.query(
                                `INSERT INTO terminals (active_code, api_key, terminal_name, devicesn, device_code, device_model, terminal_status, created_date, currency, host, retailer_id, km_term_name, imei, ip_address, location, mcc, owner_name, pos_params_loaded, terminal_type_id, term_qr_data)
                                VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULLIF(?,''), ?, ?, ?, ?, ?, ?, b?, ?, ?)`,
                                [
                                    active_code_hash,
                                    active_api_hash,
                                    data.terminal_name,
                                    data.devicesn,
                                    data.device_code,
                                    data.device_model,
                                    data.terminal_status,
                                    new Date(),
                                    currency,
                                    data.host,
                                    data.retailer_id,
                                    data.terminal_name,
                                    data.imei,
                                    data.ip_address,
                                    data.location,
                                    data.mcc,
                                    data.owner_name,
                                    data.pos_params_loaded,
                                    data.terminal_type_id,
                                    term_qr_data,
                                ],
                                (error, results) => {
                                    if (error) {
                                        return reject(error)
                                    }
                                    return resolve(results)
                                }
                            )
                        } else {
                            return reject({
                                message:
                                    'device sn с таким названием уже существует!',
                            })
                        }
                    })
                } else {
                    return reject({
                        message:
                            'terminal name с таким названием уже существует!',
                    })
                }
            })
        })
    }

    getTerminals() {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'SELECT * FROM terminals ORDER BY terminals.term_id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getTerminalById(id) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'SELECT * FROM terminals WHERE term_id = ?',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    updateTerminalById(id, data, term_qr_data) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                "UPDATE terminals SET device_code = ?, device_model = ?, devicesn = ?, host = ?, imei = ?, ip_address = ?, km_term_name = ?, location = ?, mcc = ?, owner_name = ?, terminal_name = ?, terminal_status = ?, retailer_id = NULLIF(?, 'null'), terminal_type_id = ?, km_term_name = ?, term_qr_data = ? WHERE term_id = ?",
                [
                    data.device_code,
                    data.device_model,
                    data.devicesn,
                    data.host,
                    data.imei,
                    data.ip_address,
                    data.km_term_name,
                    data.location,
                    data.mcc,
                    data.owner_name,
                    data.terminal_name,
                    data.terminal_status,
                    data.retailer_id,
                    data.terminal_type_id,
                    data.terminal_name,
                    term_qr_data,
                    id,
                ],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    removeTerminal(id) {
        return new Promise((resolve, reject) => {
            poolKM.query('SET FOREIGN_KEY_CHECKS = 0', (err, res) => {
                if (err) return reject(err)

                if (res) {
                    poolKM.query(
                        'DELETE FROM terminals WHERE term_id = ?',
                        [id],
                        (error, results) => {
                            if (error) {
                                return reject(error)
                            }
                            if (results) {
                                poolKM.query(
                                    'SET FOREIGN_KEY_CHECKS = 1',
                                    (err, res) => {
                                        if (err) return reject(err)
                                        if (res) {
                                            return resolve(results)
                                        }
                                    }
                                )
                            }
                        }
                    )
                } else {
                    console.error('Foreign key')
                }
            })
        })
    }
}

module.exports = new KmTermianlService()
