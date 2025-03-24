const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const express = require("express")

module.exports = (app) => {
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })
    app.use(express.json())
    app.use(cors()) // set this to allow only specific frontend, set credentials
    app.use(helmet()) // this could be more explicit with options dict for security measures
    app.use(morgan("dev")) // this could be better with a append mode log stream to a file with the "combined" option
}