const ApiError = require('../../Utils/apiError')
const bcrypt = require('bcrypt')
const { User } = require('../../Models/models')
const { generateJWT } = require('../../Utils/generateToken')
const { account } = require('../../Config/auth.key')

class UserController {
    async registration(req, res, next) {
        try {
            const { name, password, IsAdmin } = req.body
            if (!name || !password) {
                return next(
                    ApiError.badRequest('Некорректный имя или пассворд')
                )
            }
            const candidate = await User.findOne({
                where: { name },
            })
            if (candidate) {
                return next(
                    ApiError.conflict(
                        'Пользователь с таким имям уже существует'
                    )
                )
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({
                name,
                IsAdmin,
                password: hashPassword,
            })
            const token = generateJWT(user.id, user.name, user.IsAdmin)
            return res.status(201).json({ token })
        } catch (error) {
            return next(error)
        }
    }

    login(req, res, next) {
        try {
            const { name, password } = req.body
            const user = account.find((users) => users.name === name)
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = password === user.password
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJWT(user.id, user.name, user.IsAdmin)
            return res
                .status(200)
                .json({ token, user: user.name, IsAdmin: user.IsAdmin })
        } catch (error) {
            return next(error)
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJWT(
                req.user.id,
                req.user.name,
                req.user.IsAdmin
            )
            return res.json({ token })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new UserController()
