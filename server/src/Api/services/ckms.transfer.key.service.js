const { poolCKMS, poolSQR } = require('../../Config/Database')

class TransferKeyService {
    createTransferKey(data) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT value FROM transfer_keys WHERE value = ?`
            const values = [
                ['static_qr', 'providerId', data.provider_id, data.id],
                ['static_qr', 'terminalId', data.terminal_id, data.id],
                [
                    'static_qr',
                    'checksumKey',
                    data.external_checksum_key,
                    data.id,
                ],
            ]

            poolCKMS.query(sql, [data.terminal_id], (error, results) => {
                if (error) return reject(error)

                const check_values = results.find(
                    (item) => item.value === data.terminal_id
                )
                if (!check_values) {
                    poolCKMS.query(
                        'INSERT INTO transfer_keys (instance, name, value, request_id) VALUE ?',
                        [values],
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
                            'Terminal_ID с таким названием уже существует!',
                    })
                }
            })
        })
    }

    getTransferKey() {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'SELECT sqr_terminal.id, sqr_terminal.provider_id, sqr_terminal.terminal_id,  sqr_terminal.external_checksum_key FROM sqr_terminal INNER JOIN sqr_providers ON sqr_terminal.provider_id = sqr_providers.id ORDER BY sqr_terminal.id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getTransferKeyById(id) {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'SELECT sqr_terminal.id, sqr_terminal.provider_id, sqr_terminal.terminal_id, sqr_terminal.external_checksum_key FROM sqr_terminal INNER JOIN sqr_providers ON sqr_terminal.provider_id = sqr_providers.id WHERE sqr_terminal.id = ? ',
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

    removeTransferKey(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolCKMS.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolCKMS.query(
                    'DELETE FROM transfer_keys WHERE id = ?',
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

module.exports = new TransferKeyService()
