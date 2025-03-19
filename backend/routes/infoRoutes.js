const express = require("express")
const Info = require("../models/Info")

const router = express.Router()

// This endpoint can be more secure...
router.get('/1', async (req, res, next) => {
    try {
        const info = await Info.findOne()
        if(!info) return res.status(404).json({ error: 'No record in Info table.' })
        res.status(200).json(info)
    } catch (error) {
        next(error)
    }
})

module.exports = router