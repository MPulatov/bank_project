const { poolCKMS } = require('../../Config/Database')

class CkmsPosRequestService {
    createPosRequest(data) {
        return new Promise((resolve, reject) => {
            poolCKMS.query(
                'INSERT INTO pos_requests (term_imei, term_inn, term_ein, term_rnm, term_sn, otp_code, active, transmitted, created_at) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    data.term_imei,
                    data.term_inn,
                    data.term_ein,
                    data.term_rnm,
                    data.term_sn,
                    data.otp_code,
                    true,
                    false,
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

    getPosRequests() {
        return new Promise((resolve, reject) => {
            poolCKMS.query(
                'SELECT * FROM pos_requests ORDER BY id DESC',
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }

    getPosRequestById(id) {
        return new Promise((resolve, reject) => {
            poolCKMS.query(
                'SELECT pos_requests.id, pos_requests.term_inn, pos_requests.term_ein, pos_requests.term_rnm, pos_requests.term_sn, terminals.imei  FROM pos_requests INNER JOIN cbt_km.terminals ON pos_requests.id = terminals.term_id WHERE pos_requests.id = ? ',
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

    removePosRequest(id) {
        return new Promise((resolve, reject) => {
            const unlock = poolCKMS.query('SET FOREIGN_KEY_CHECKS = 0')
            if (unlock) {
                poolCKMS.query(
                    'DELETE FROM pos_requests WHERE id = ?',
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

module.exports = new CkmsPosRequestService()
