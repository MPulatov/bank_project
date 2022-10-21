const sequelize = require('../Config/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('users', {
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
    roles: {
        type: DataTypes.STRING,
        defaultValue: ['Employee'],
    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

module.exports = { User }
