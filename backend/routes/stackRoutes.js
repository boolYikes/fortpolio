const express = require("express")
const Stack = require("../models/Stack")

const router = express.Router()

router.get('/1', async (req, res, next) => {
    try {
        const stack = await Stack.findOne()
        if(!stack) return res.status(404).json({ error: 'No record in Stack table.' })
        res.status(200).json(stack)
    } catch (error) {
        next(error)
    }
})

module.exports = router