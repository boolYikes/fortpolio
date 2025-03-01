// we'll refactor later ....😂

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const { Sequelize, QueryTypes } = require('sequelize')
const conn_info = {
    'host': process.env.DUCKDB_HOST,
    'port': process.env.DUCKDB_PORT,
    'username': process.env.DUCKDB_USER,
    'password': process.env.DUCKDB_PASSWORD,
    'database': process.env.DUCKDB_DATABASE,
    'dialect': 'postgres'
}
const sequelize = new Sequelize(options=conn_info)

// Middleware
app.use(cors())
// app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is running...')
    console.log("landed")
})

// Query Route - Example: Fetch Tech Stacks
app.get('/api/test', async (req, res) => {
    const test_res = await sequelize.query('SELECT * FROM public.test', { type: QueryTypes.SELECT })
    res.json(test_res)
    console.log(`fetched ${test_res.length} rows`)
})
            
const port = process.env.PORT || 5000

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
