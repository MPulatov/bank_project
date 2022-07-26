module.exports = {
    STATICQR_DB: {
        host: process.env.HOST_TER,
        user: process.env.USER_TER,
        password: process.env.PASSWORD_TER,
        database: process.env.DATABASE_TER,
        port: process.env.PORT_DATABASE,
        insecureAuth: true,
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },
    KM_DB: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_KM,
        port: process.env.PORT_DATABASE,
        insecureAuth: true,
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },
    TIJORAT_DB: {
        host: process.env.HOST_TER,
        user: process.env.USER_TER,
        password: process.env.PASSWORD_TER,
        database: process.env.DATABASE_FAVRI,
        port: process.env.PORT_DATABASE,
        insecureAuth: true,
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },
    CKMS_DB: {
        host: process.env.HOST_TER,
        user: process.env.USER_TER,
        password: process.env.PASSWORD_TER,
        database: process.env.DATABASE_CKMS,
        port: process.env.PORT_DATABASE,
        insecureAuth: true,
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },
}