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

const app = express()

applyMiddlewares(app)
app.use('/api/info', infoRoutes)
applyErrorHandler(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    // await sequelize.sync({ alter: true }) // model syncing to DB
    await sequelize.sync()
})
