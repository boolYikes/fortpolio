require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize')
const conn_info = {
    'host': process.env.DUCKDB_HOST,
    'port': process.env.DUCKDB_PORT,
    'username': process.env.DUCKDB_USER,
    'password': process.env.DUCKDB_PASSWORD,
    'database': process.env.DUCKDB_DATABASE,
    'dialect': 'postgres'
}
const sequelize = new Sequelize(options=conn_info)

const app = express();
const port = process.env.PORT || 5000;

const main = async() => {
    try {
        await sequelize.authenticate()
        console.log("connection established1")
        sequelize.close()
    } catch (error) {
        console.error('nope not doing it', error)
    }
}
main()
// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test Route
// app.get('/', (req, res) => {
//     res.send('Backend is running...');
// });

// // Query Route - Example: Fetch Tech Stacks
// app.get('/api/test', (req, res) => {
//     var con = db.connect()
//     con.all('SELECT * FROM public.test', (err, rows) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(rows);
//         });
// });

// // Start Server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
