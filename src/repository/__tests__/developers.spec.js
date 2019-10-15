const developersRepository = require("./../../repository/developers")
const models = require("./../../models")
const faker = require("faker")

const insertNDummyData = async n => {
    let p = []

    for (let i = 0; i < n; i++) {
        const data = {
            name: faker.name.firstName()
        }

        p.push(models.developers.create(data))
    }

    await Promise.all(p)

    return
}

describe("developers repository tests", () => {
    beforeEach(async () => {
        models.developers.destroy({ where: {} })
        models.companies.destroy({ where: {} })
        models.skills.destroy({ where: {} })
    })

    describe("store method", () => {
        it("should store a new developer", async () => {
            const name = "Marcus"
            let skill = await developersRepository.store({
                name
            })
            expect(skill.name).toBe(name)
            expect(skill).toHaveProperty("id")
        })
    })

    describe("fetch method", () => {
        it("it should return an array with length of 10", async () => {
            const size = 10

            await insertNDummyData(size)

            let developers = await developersRepository.fetch()
            expect(developers).toHaveLength(size)
        })
    })

    describe("fetchFullObjectById method", () => {
        it("should return the full stored object", async () => {
            //await insertNDummyData(10)

            const name = "Marcus"
            const companyName = faker.company.companyName()

            const developer = await models.developers.create({
                name
            })
            const storedSkill = await models.skills.create({
                description: "Javascript"
            })
            const storedCompany = await models.companies.create({
                name: companyName
            })
            await developer.setSkills([storedSkill])
            await developer.setCompany(storedCompany)
            let developerFullObject = await developersRepository.fetchFullObjectById(developer.id)
            expect(developerFullObject.name).toBe(name)
            expect(developerFullObject.company.name).toBe(companyName)
            expect(developerFullObject.skills[0].description).toEqual(storedSkill.description)
            expect(developerFullObject.skills[0].id).toEqual(storedSkill.id)
            expect(developerFullObject.skills.length).toBe(1)
        })
        it("should return null when can not find a developer by its id", async () => {
            await insertNDummyData(10)
            let developerFullObject = await developersRepository.fetchFullObjectById("123456")
            expect(developerFullObject).toBe(null)
        })
    })
})
