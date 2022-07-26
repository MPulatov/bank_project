const verify = require('joi')

module.exports = {
    tijorat_organization: verify.object({
        organization_name: verify.string().min(4).max(20).required(),
    }),

    tijorat_sale: verify.object({
        name: verify
            .string()
            .min(4)
            .max(50)
            .required('Это поле необходимо заполнить.'),
        organization_id: verify
            .string()
            .required('Это поле необходимо заполнить.'),
    }),

    tijorat_users: verify.object({
        fullname: verify
            .string()
            .min(4)
            .max(30)
            .required('Это поле необходимо заполнить.'),
        email: verify
            .string()
            .email()
            .min(4)
            .required('Это поле необходимо заполнить.'),
        password: verify
            .string()
            .min(4)
            .required('Это поле необходимо заполнить.'),
        organization_id: verify
            .string()
            .required('Это поле необходимо заполнить.'),
        active: verify
            .string()
            .min(1)
            .max(3)
            .required('Это поле необходимо заполнить.'),
    }),
}
