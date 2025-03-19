module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(500).json({ error: err.message || "Internal Organ Error! 😫" })
    })
    
}