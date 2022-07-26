const { poolTIJORAT } = require('../../Config/Database')

class TijoratUserService {
    createUser(data) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'INSERT INTO tij_users (fullname, email, password, organization_id, active, roles) VALUE (?, ?, ?, ?, ?, ?)',
                [
                    data.fullname,
                    data.email,
                    data.password,
                    data.organization_id,
                    data.active,
                    true,
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

    getUsers() {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'SELECT tij_users.id, tij_users.fullname, tij_users.email, tij_users.active, tij_users.created_time, tij_users.organization_id, tij_organizations.organization_name FROM tij_users INNER JOIN tij_organizations ON tij_users.organization_id = tij_organizations.id ORDER BY tij_users.id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getUsersById(id) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'SELECT id, fullname, email, active, organization_id, created_time  FROM tij_users  WHERE id = ?',
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

    updateUserById(id, data) {
        return new Promise((resolve, reject) => {
            poolTIJORAT.query(
                'UPDATE tij_users SET fullname = ?, email = ?,  active = ?,  organization_id = ?  WHERE id = ?',
                [
                    data.fullname,
                    data.email,
                    data.active,
                    data.organization_id,
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

    removeUser(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolTIJORAT.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolTIJORAT.query(
                    'DELETE FROM tij_users WHERE id = ?',
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

module.exports = new TijoratUserService()
