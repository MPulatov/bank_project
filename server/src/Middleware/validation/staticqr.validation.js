const verify = require('joi')

module.exports = {
    staticqr_provider: verify.object({
        name: verify.string().min(10).max(20).required(),
        purposeText: verify.string().min(10).required(),
    }),

    staticqr_terminal: verify.object({
        terminalId: verify
            .string()
            .min(9)
            .pattern(/^[A-Z]{2}[0-9]{10}$/)
            .required(),
        providerId: verify.string().max(1).required(),
        certificatePassword: verify
            .string()
            .min(4)
            .regex(/^[0-9]+$/)
            .required(),
        checksumKey: verify.string().min(64).required(),
        absId: verify
            .string()
            .min(4)
            .regex(/^[0-9]+$/)
            .required(),
        secretKey: verify
            .string()
            .min(4)
            .regex(/^[0-9]+$/)
            .required(),
    }),
}
