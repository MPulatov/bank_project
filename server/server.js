'use strict'
const express = require('express')
// const sequelize = require('./src/Config/db')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const { router } = require('./src/Routes/index.routes')
const { logger } = require('./src/Logger/Winston')
const errorHandler = require('./src/Middleware/ErrorHandlingMiddleware')
const { notFound, ErrorHandler } = require('./src/Middleware/ErrorMiddleware')
// const cors = require('cors')
const path = require('path')
require('dotenv').config()

// Настройки
const PORT = process.env.PORT_SERVER || 4000
// Инициализация
const app = express()
// Логирование
app.use(require('morgan')('common', { stream: logger.stream }))
// Секьюрити
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join('public')))

// Промежуточное Программное Обеспечение
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
        'Access-Control-Expose-Headers',
        'Content-Length, X-Kuma-Revision'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.setHeader('Content-Type', 'application/json')
    next()
})
// Роутинг
app.use(express.json())
app.use('/api', router)
// Static upload image
app.use('/upload', express.static('./upload'))

// --------------------------deployment------------------------------
// app.use('*', (req, res, next) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

// Обработка ошибок, последний Middleware
app.use(errorHandler)
app.use(notFound)
app.use(ErrorHandler)

// Подключение Базы Данных
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        }).on('error', function () {
            process.once('SIGUSR2', function () {
                process.kill(process.pid, 'SIGUSR2')
            })
            process.on('SIGUSR', function () {
                process.kill(process.pid, 'SIGUSR')
            })
            process.on('uncaughtException', function () {
                console.log('uncaught exception')
                console.log('Inside uncaught exception')
            })
        })
        // await sequelize.authenticate()
        // await sequelize.sync()
    } catch (err) {
        return console.error('Ошибка: ' + err.message)
    }
    return console.log('Подключение к серверу MySQL успешно установлено')
}
start()
