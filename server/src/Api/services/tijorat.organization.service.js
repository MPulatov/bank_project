const { poolTIJORAT } = require('../../Config/Database')

class TijoratOrganizationService {
    createOrganization(data) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'INSERT INTO tij_organizations (organization_name) VALUE (?)',
                [data.organization_name],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getOrganizations() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM tij_organizations ORDER BY id DESC'
            poolTIJORAT.query(sql, (error, results) => {
                if (error) {
                    return reject(error)
                }
                return resolve({ results })
            })
        })
    }

    getOrganizationById(id) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'SELECT * FROM tij_organizations WHERE id = ? ',
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

    updateOrganizationById(id, data) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'UPDATE tij_organizations SET organization_name = ? WHERE id = ? ',
                [data.organization_name, id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    removeOrganization(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolTIJORAT.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolTIJORAT.query(
                    'DELETE FROM tij_organizations WHERE id = ?',
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

module.exports = new TijoratOrganizationService()
