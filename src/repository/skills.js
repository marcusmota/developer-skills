const { skills: model, developers, companies } = require("./../models")
const sequelize = require("sequelize")

const store = async (obj, opt = {}) => {
    return await model.create(obj, { ...opt })
}

const countByDescription = async description => {
    return await model.count({
        where: {
            description
        }
    })
}

const fetch = async (where = {}) => {
    return await model.findAll({
        where
    })
}

const fetchByDescription = async description => {
    return await model.findOne({
        where: { description }
    })
}

const fetchSkillsWithCompaniesUsingIt = async () => {
    return model.findAll({
        where: {},
        include: [{ model: developers, as: "developers", include: [{ model: companies, as: "company" }] }]
    })
}

const fetchSkillsWithCount = async () => {
    return model.sequelize.query("select s.description as language, count(s.id) as total from skills s join `developer-skills` ds on ds.skillId = s.id group by s.id order by total desc", { type: sequelize.QueryTypes.SELECT })
}

module.exports = {
    store,
    fetch,
    countByDescription,
    fetchByDescription,
    fetchSkillsWithCount,
    fetchSkillsWithCompaniesUsingIt
}
