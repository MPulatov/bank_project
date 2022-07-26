const verify = require('joi')

module.exports = {
    km_retailer: verify.object({
        name: verify.string().min(4).required(),
        addres: verify.string().min(4).required(),
        description: verify.string().min(4).required(),
        km_retailerid: verify.string().min(1).required(),
        active: verify.string().min(1).required(),
        ein: verify.string().min(8).required(),
        inn: verify.string().min(8).required(),
        number: verify.string().min(8).required(),
        rnm: verify.string().min(4).required(),
    }),

    km_terminals: verify.object({
        terminal_type_id: verify.string().min(2).required(),
        owner_name: verify.string().min(10).required(),
        retailer_id: verify.string().min(0),
        location: verify.string().min(10).required(),
        terminal_name: verify
            .string()
            .min(10)
            .pattern(/^[A-Z]{4}[0-9]+$/)
            .required(),

        active_code: verify
            .string()
            .min(10)
            .pattern(/^[0-9]+$/)
            .required(),
        terminal_status: verify.string().max(1).required(),
        device_code: verify.string().min(10).required(),
        devicesn: verify.string().min(10).required(),
        device_model: verify.string().min(2).required(),
        imei: verify
            .string()
            .min(17)
            .pattern(/^[0-9]+$/)
            .required(),
        mcc: verify
            .string()
            .min(10)
            .pattern(/^[0-9]+$/)
            .required(),

        pos_params_loaded: verify.string().max(1).required(),

        ip_address: verify
            .string()
            .min(0)
            .pattern(/(^(\d{1,3}\.){3}(\d{1,3})$)/),
        host: verify
            .string()
            .min(0)
            .pattern(/(^[0-9]+$)/),
    }),

    km_terminal_permission: verify.object({
        transaction_code: verify.string().min(1).required(),
        terminal_id: verify.string().min(1).required(),
    }),
}
