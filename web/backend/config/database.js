const { Sequelize } = require("sequelize")
require("dotenv").config()

const conn_info = {
    'host': process.env.FORT_PG_HOST,
    'port': Number(process.env.FORT_PG_PORT),
    'username': process.env.FORT_PG_USER,
    'password': process.env.FORT_PG_PASSWORD,
    'database': process.env.FORT_PG_DATABASE,
    'dialect': 'postgres'
}

const sequelize = new Sequelize(conn_info)

const connCheck = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ DB connected.")
    } catch (error) {
        console.log("⛔ DB connection failed:", error)
    }
}

connCheck()

module.exports = sequelize