const { developers: model, skills, companies } = require("./../models")

const store = async (obj, opt = {}) => {
    return await model.create(obj, { ...opt })
}

const countByName = async name => {
    return await model.count({
        where: {
            name
        }
    })
}

const fetch = async (where = {}) => {
    return await model.findAll({
        where
    })
}

const fetchFullObjectById = async id => {
    return await model.findOne({
        where: {
            id
        },
        include: [{ model: skills, as: "skills" }, { model: companies, as: "company" }]
    })
}

module.exports = {
    store,
    fetch,
    countByName,
    fetchFullObjectById
}
