const fs = require("fs")

module.exports = {
    development: {
        username: "root",
        password: "dev",
        database: "challenge",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: "dev",
        database: "challenge_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: "mysql"
    }
}
