const express = require("express")

const skillsController = require("./../controllers/skills")

const router = express.Router()

router.get("/fetch-skills-with-companies", skillsController.fetchSkillsWithCompaniesUsingIt)
router.get("/fetch-skills-count", skillsController.fetchSkillsWithCount)

module.exports = router
