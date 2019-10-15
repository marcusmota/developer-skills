const express = require("express")

const skillsRoutes = require("./routes/skills")
const developersRoutes = require("./routes/developers")

const app = express()

app.use(express.json())

app.use(skillsRoutes)
app.use(developersRoutes)

app.get("/hearth-beat", (req, res) => {
    res.json({
        msg: "service is running"
    })
})

app.use((req, res, next) => {
    res.status(404).json({ msg: "invalid route" })
})

module.exports = app
