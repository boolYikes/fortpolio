const { Sequelize } = require("sequelize")
require("dotenv").config()

const conn_info = {
    'host': process.env.DUCKDB_HOST,
    'port': process.env.DUCKDB_PORT,
    'username': process.env.DUCKDB_USER,
    'password': process.env.DUCKDB_PASSWORD,
    'database': process.env.DUCKDB_DATABASE,
    'dialect': 'postgres'
}

const sequelize = new Sequelize(options=conn_info)

const connCheck = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected.")
    } catch (error) {
        console.log("DB connection failed:", error)
    }
}

connCheck()

module.exports = sequelize