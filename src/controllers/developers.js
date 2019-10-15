const developerRepository = require("./../repository/developers")
const companiesRepository = require("./../repository/companies")
const skillsRepository = require("./../repository/skills")
const models = require("./../models")

const _storeOrReturnLanguage = async (description, transaction) => {
    const fetched = await skillsRepository.fetchByDescription(description)
    if (!fetched) {
        return await skillsRepository.store({ description }, { transaction })
    } else {
        return fetched
    }
}

const _storeOrReturnCompany = async (name, transaction) => {
    const fetched = await companiesRepository.fetchByName(name)
    if (!fetched) {
        return await companiesRepository.store({ name }, { transaction })
    } else {
        return fetched
    }
}

const _wrapLanguagesInPromise = (arr, transaction) => {
    const promisesToReturn = []

    arr.forEach(element => {
        promisesToReturn.push(_storeOrReturnLanguage(element, transaction))
    })

    return promisesToReturn
}

const store = async (req, res) => {
    let transaction = null

    try {
        const { name, company, languages = [] } = req.body

        if (!name) {
            throw Error("the field name is required")
        }
        if (!company) {
            throw Error("the field company is required")
        }
        if (!languages.length) {
            throw Error("you must provide at least one skill")
        }

        const isDeveloperStored = await developerRepository.countByName(name)

        if (!isDeveloperStored) {
            /*
            SQL starting the transaction            
            */
            transaction = await models.sequelize.transaction()

            const companyObject = await _storeOrReturnCompany(company, transaction)

            const developerObject = await developerRepository.store({ name }, { transaction })

            const languagesArray = await Promise.all(_wrapLanguagesInPromise(languages, transaction))

            await developerObject.setSkills(languagesArray, { transaction })
            await developerObject.setCompany(companyObject, { transaction })

            /*
            SQL commiting the transaction            
            */
            await transaction.commit()

            const developerFullObject = await developerRepository.fetchFullObjectById(developerObject.id)

            return res.send(developerFullObject)
        } else {
            return res.status(422).json({ msg: "The developer " + name + " is already stored in the database" })
        }
    } catch (err) {
        /*
        SQL rolling back the transaction if it's started          
        */
        if (transaction) {
            transaction.rollback()
        }
        res.status(422).json({ msg: err.message || "Generic exception catch" })
    }
}

module.exports = {
    store,
    _storeOrReturnLanguage,
    _storeOrReturnCompany,
    _wrapLanguagesInPromise
}
