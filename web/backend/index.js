// TODOs
// ✅Models
// ✅Error sift middleware
// ✅Routers middleware
// Test middleware

const express = require('express')
require('dotenv').config()
const sequelize = require("./config/database")
const applyMiddlewares = require("./middlewares/commonMiddlewares")
const applyErrorHandler = require("./middlewares/errorHandler")
const infoRoutes = require("./routes/infoRoutes")
const stackRoutes = require("./routes/stackRoutes")

const app = express()

const path = require('path')
app.use('/fortpolio', express.static(path.join(__dirname, '../client/dist')))

applyMiddlewares(app)
app.use('/api/info', infoRoutes)
app.use('/api/stack', stackRoutes)
applyErrorHandler(app)

const PORT = process.env.FORT_BACKEND_PORT || 5000

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    console.log("Githook test")
    // await sequelize.sync({ alter: true }) // model syncing to DB
    await sequelize.sync()
})
