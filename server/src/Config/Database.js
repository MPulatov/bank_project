const { createPool } = require('mysql2')
const { promisify } = require('util')
const { STATICQR_DB, KM_DB, CKMS_DB, TIJORAT_DB } = require('./DBKey')

const poolSQR = createPool(STATICQR_DB)
const poolKM = createPool(KM_DB)
const poolTIJORAT = createPool(TIJORAT_DB)
const poolCKMS = createPool(CKMS_DB)

// тестирование подключения
poolSQR.getConnection((err, connection) => {
    if (err) {
        return console.error('Ошибка: ' + err.message)
    }
    if (connection) {
        console.log('Подключение к серверу MySQL успешно установлено')
    }
    return
})

poolSQR.query = promisify(poolSQR.query)

// BD RETAILER // тестирование подключения
poolKM.getConnection((err, connection) => {
    if (err) {
        return console.error('Ошибка: ' + err.message)
    }
    if (connection) {
        console.log('Подключение к серверу MySQL успешно установлено')
    }
    return
})

poolKM.query = promisify(poolKM.query)

// BD RETAILER // тестирование подключения
poolTIJORAT.getConnection((err, connection) => {
    if (err) {
        return console.error('Ошибка: ' + err.message)
    }
    if (connection) {
        console.log('Подключение к серверу MySQL успешно установлено')
    }
    return
})

poolTIJORAT.query = promisify(poolTIJORAT.query)

// BD POS REQUESTS // тестирование подключения
poolCKMS.getConnection((err, connection) => {
    if (err) {
        return console.error('Ошибка: ' + err.message)
    }
    if (connection) {
        console.log('Подключение к серверу MySQL успешно установлено')
    }
    return
})

poolCKMS.query = promisify(poolCKMS.query)

module.exports = { poolSQR, poolKM, poolTIJORAT, poolCKMS }
