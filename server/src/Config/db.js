const { Sequelize } = require('sequelize')
require('dotenv').config()

// Конфигурация Базы Данных
module.exports = new Sequelize(
    process.env.DB_NAME, //Название БД
    process.env.DB_USER, // Название Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        // username: 'root',
        // password: 'mpulatov1995',
        // database: 'authentication',
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.PORT_DATABASE,
    }
)
