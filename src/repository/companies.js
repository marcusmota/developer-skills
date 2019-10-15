const { companies: model } = require("./../models")

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

const fetchByName = async name => {
    return await model.findOne({
        where: {
            name
        }
    })
}

module.exports = {
    store,
    fetch,
    countByName,
    fetchByName
}
