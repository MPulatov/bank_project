const { sign } = require('jsonwebtoken')

const generateJWT = (id, name, IsAdmin) => {
    return sign({ id, name, IsAdmin }, process.env.SECRET_KEY, {
        expiresIn: '2h',
    })
}

module.exports = { generateJWT }
