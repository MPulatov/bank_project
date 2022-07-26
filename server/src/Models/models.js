const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('Authentication', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: { type: DataTypes.STRING },
    IsAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

module.exports = { User }
