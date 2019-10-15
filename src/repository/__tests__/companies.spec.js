const companiesRepository = require("./../../repository/companies")
const models = require("./../../models")
const faker = require("faker")

const insertNDummyData = async n => {
    let p = []

    for (let i = 0; i < n; i++) {
        const data = {
            name: faker.company.companySuffix()
        }

        p.push(models.companies.create(data))
    }

    await Promise.all(p)

    return
}

describe("companies repository tests", () => {
    beforeEach(async () => {
        models.companies.destroy({ where: {} })
    })

    describe("store method", () => {
        it("should store a new company", async () => {
            const name = "Cloudoki"
            const company = await companiesRepository.store({
                name
            })
            expect(company.name).toBe(name)
            expect(company).toHaveProperty("id")
        })
    })

    describe("fetch method", () => {
        it("it should return an array with length of 10", async () => {
            const size = 10

            await insertNDummyData(size)

            let companies = await companiesRepository.fetch()
            expect(companies).toHaveLength(size)
        })
    })

    describe("fetchByName method", () => {
        it("should return an object based on its name", async () => {
            await insertNDummyData(10)

            const name = "Cloudoki"

            await models.companies.create({
                name
            })
            let companies = await companiesRepository.fetchByName(name)
            expect(companies.name).toBe(name)
        })
        it("should not return an object when the name is not stored in database", async () => {
            await insertNDummyData(10)

            const name = "Cloudoki"

            let companies = await companiesRepository.fetchByName(name)
            expect(companies).toBe(null)
        })
    })

    describe("countByName method", () => {
        it("should return 2 which is the count based on its name", async () => {
            await insertNDummyData(10)

            const name = "Cloudoki"

            await models.companies.create({
                name
            })

            await models.companies.create({
                name
            })

            let companies = await companiesRepository.countByName(name)
            expect(companies).toBe(2)
        })
        it("should return 0 which is the count based on its name", async () => {
            await insertNDummyData(10)

            const name = "Cloudoki"

            let companies = await companiesRepository.countByName(name)
            expect(companies).toBe(0)
        })
    })
})
