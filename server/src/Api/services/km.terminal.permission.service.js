const { poolKM } = require('../../Config/Database')

class KmTermianlPermissionService {
    createTerminalPermission(data, transaction_name) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'INSERT INTO terminalallowedtran (transaction_code,  terminal_id, transaction_name, created_date) VALUE ( ?, ?, ?, ?)',
                [
                    data.transaction_code,
                    data.terminal_id,
                    transaction_name,
                    new Date(),
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

    getTerminalsPermission() {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'SELECT terminalallowedtran.terminal_allowed_tran_id, terminalallowedtran.transaction_code, terminalallowedtran.transaction_name, terminals.terminal_name FROM terminalallowedtran INNER JOIN terminals ON terminalallowedtran.terminal_allowed_tran_id = terminals.term_id ORDER BY terminal_allowed_tran_id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getTerminalPermissionById(id) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'SELECT * FROM terminalallowedtran WHERE terminal_allowed_tran_id = ? ',
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

    updateTerminaPermissionlById(id, data, transaction_name) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'UPDATE terminalallowedtran SET transaction_code = ?, terminal_id = ?, transaction_name = ? WHERE terminal_allowed_tran_id = ? ',
                [data.transaction_code, data.terminal_id, transaction_name, id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    removeTerminalPermission(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolKM.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolKM.query(
                    'DELETE FROM terminalallowedtran WHERE terminal_allowed_tran_id = ?',
                    [id],
                    (error, results) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            }
        })
    }
}

module.exports = new KmTermianlPermissionService()
