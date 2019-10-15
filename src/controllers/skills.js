const skillRepository = require("./../repository/skills")

const fetchSkillsWithCompaniesUsingIt = async (req, res) => {
    try {
        const response = await skillRepository.fetchSkillsWithCompaniesUsingIt()

        const mapToExpectedAnswer = response.map(sk => {
            const companies = []

            sk.developers.forEach(dev => {
                const { name } = dev.company
                const isStored = companies.indexOf(name) !== -1
                if (!isStored) {
                    companies.push(name)
                }
            })
            const newShape = {
                language: sk.description,
                companies
            }

            return newShape
        })
        res.json(mapToExpectedAnswer)
    } catch (err) {
        console.log(err)
        res.status(422).json({ msg: err.message || "Generic exception catch" })
    }
}

const fetchSkillsWithCount = async (req, res) => {
    try {
        const response = await skillRepository.fetchSkillsWithCount()

        const returnShape = {}

        response.forEach(sk => {
            returnShape[sk.language] = sk.total
        })
        res.json(returnShape)
    } catch (err) {
        res.status(422).json({ msg: err.message || "Generic exception catch" })
    }
}

module.exports = {
    fetchSkillsWithCompaniesUsingIt,
    fetchSkillsWithCount
}
