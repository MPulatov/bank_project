const { poolSQR } = require('../../Config/Database')

class StaticqrTerminalService {
    createTerminal(data) {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'INSERT INTO sqr_terminal ( provider_id, terminal_id, local_terminal_id, local_terminal_password, external_checksum_key, active) VALUE (?, ?, ?, ?, ?, ?)',
                [
                    data.provider_id,
                    data.terminal_id,
                    data.local_terminal_id,
                    data.local_terminal_password,
                    data.external_checksum_key,
                    data.active,
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

    getTerminals() {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'SELECT sqr_terminal.id, sqr_terminal.provider_id, sqr_terminal.terminal_id, sqr_terminal.local_terminal_id, sqr_terminal.local_terminal_password, sqr_terminal.active, sqr_providers.name FROM sqr_terminal INNER JOIN sqr_providers ON sqr_terminal.provider_id = sqr_providers.id ORDER BY sqr_terminal.id DESC',
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
            poolSQR.query(
                'SELECT sqr_terminal.id, sqr_terminal.provider_id, sqr_terminal.terminal_id, sqr_terminal.local_terminal_id, sqr_terminal.local_terminal_password, sqr_terminal.active, sqr_providers.name FROM sqr_terminal INNER JOIN sqr_providers ON sqr_terminal.provider_id = sqr_providers.id WHERE sqr_terminal.id = ? ',
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

    updateTerminalById(id, data) {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'UPDATE sqr_terminal SET provider_id = ?, terminal_id = ?, local_terminal_id = ?, local_terminal_password = ?, active = ? WHERE sqr_terminal.id = ?',
                [
                    data.provider_id,
                    data.terminal_id,
                    data.local_terminal_id,
                    data.local_terminal_password,
                    data.active,
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
            const unlock = poolSQR.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolSQR.query(
                    'DELETE FROM sqr_terminal WHERE id = ?',
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

module.exports = new StaticqrTerminalService()
