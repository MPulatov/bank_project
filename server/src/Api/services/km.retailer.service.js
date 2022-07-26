const { poolKM } = require('../../Config/Database')

class KmRetailerService {
    createRetailer(data) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'INSERT INTO retailer (active, addres, description, ein, inn, km_retailerid, name, number, rnm) VALUE (b?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    data.active,
                    data.addres,
                    data.description,
                    data.ein,
                    data.inn,
                    data.km_retailerid,
                    data.name,
                    data.number,
                    data.rnm,
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

    getRetailers() {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'SELECT retailer_id, name, addres, number, description, km_retailerid, ein, inn, rnm, active, created_date FROM retailer ORDER BY retailer.retailer_id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getRetailerById(id) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'SELECT * FROM retailer WHERE retailer_id = ?',
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

    updateRetailerById(id, data) {
        return new Promise((resolve, reject) => {
            poolKM.query(
                'UPDATE retailer SET addres = ?, description = ?, ein = ?, inn = ?, km_retailerid = ?, name = ?, number = ?, rnm = ? WHERE retailer_id = ? ',
                [
                    data.addres,
                    data.description,
                    data.ein,
                    data.inn,
                    data.km_retailerid,
                    data.name,
                    data.number,
                    data.rnm,
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

    removeRetailer(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolKM.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolKM.query(
                    'DELETE FROM retailer WHERE retailer_id = ?',
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

module.exports = new KmRetailerService()
