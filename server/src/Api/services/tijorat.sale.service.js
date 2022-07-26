const { poolTIJORAT } = require('../../Config/Database')

class TijoratSaleService {
    createSale(data) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'INSERT INTO tij_point_of_sale (name, organization_id) VALUE (?, ?)',
                [data.name, data.organization_id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getSales() {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'SELECT tij_point_of_sale.id, tij_point_of_sale.name, tij_point_of_sale.organization_id, tij_organizations.organization_name FROM tij_point_of_sale INNER JOIN tij_organizations ON tij_point_of_sale.organization_id = tij_organizations.id ORDER BY tij_point_of_sale.id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getSalesById(id) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'SELECT id, name, organization_id  FROM tij_point_of_sale WHERE id = ? ',
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

    updateSalesById(id, data) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'UPDATE tij_point_of_sale SET name = ?, organization_id = ?  WHERE id = ?',
                [data.name, data.organization_id, id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    removeSales(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolTIJORAT.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolTIJORAT.query(
                    'DELETE FROM tij_point_of_sale WHERE id = ?',
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

module.exports = new TijoratSaleService()
