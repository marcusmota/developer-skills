const express = require("express")

const controller = require("./../controllers/developers")

const router = express.Router()

router.post("/developers", controller.store)

module.exports = router
