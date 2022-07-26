const { poolSQR } = require('../../Config/Database')

class StaticqrProviderService {
    createProvider(data) {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'INSERT INTO sqr_providers (name, purpose_text) VALUE (?, ?)',
                [data.name, data.purpose_text],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getProviders() {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'SELECT * FROM sqr_providers ORDER BY id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getProviderById(id) {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'SELECT * FROM sqr_providers WHERE id = ? ',
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

    updateProviderById(id, data) {
        return new Promise((resolve, reject) => {
            poolSQR.query(
                'UPDATE sqr_providers SET name = ?,  purpose_text = ? WHERE id = ? ',
                [data.name, data.purpose_text, id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    removeProvider(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolSQR.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolSQR.query(
                    'DELETE FROM sqr_providers WHERE id = ?',
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

module.exports = new StaticqrProviderService()
