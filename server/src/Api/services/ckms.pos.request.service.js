const { poolCKMS, poolKM } = require('../../Config/Database')

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
            poolKM.query(
                'SELECT retailer.retailer_id, retailer.inn, retailer.ein, retailer.rnm, terminals.imei, terminals.devicesn FROM retailer INNER JOIN cbtfimiposdb.terminals ON retailer.retailer_id = terminals.retailer_id WHERE terminals.imei = ?',
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
