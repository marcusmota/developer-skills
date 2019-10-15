let faker = require("faker")
const models = require("./../../models")
const developersController = require("./../developers")
const request = require("supertest")
const app = require("../../app")

describe("developers controller tests", () => {
    beforeAll(done => {
        app.listen(done)
    })

    afterAll(done => {
        app.close(done)
    })
    beforeEach(async () => {
        models.developers.destroy({ where: {} })
        models.companies.destroy({ where: {} })
        models.skills.destroy({ where: {} })
    })

    describe("POST /developer", () => {
        it("should return 200 with the stored developer object", async () => {
            const dummyData = {
                name: faker.name.firstName(),
                company: faker.company.companySuffix(),
                languages: [faker.name.firstName(), faker.name.firstName(), faker.name.firstName()]
            }

            const result = await request(app)
                .post(`/developers`)
                .send(dummyData)
                .set("Accept", /application\/json/)

            expect(result.status).toBe(200)
            expect(result.body.name).toBe(dummyData.name)
            expect(result.body.company.name).toBe(dummyData.company)
        })

        const requiredFields = ["name", "company"]
        requiredFields.forEach(field => {
            it(`should return 422 when the required param (${field}) is not defined`, async () => {
                const dummyData = {
                    name: faker.name.firstName(),
                    company: faker.company.companySuffix(),
                    languages: [faker.name.firstName(), faker.name.firstName(), faker.name.firstName()]
                }

                delete dummyData[field]

                const result = await request(app)
                    .post(`/developers`)
                    .send(dummyData)
                    .set("Accept", /application\/json/)

                expect(result.status).toBe(422)
                expect(result.body.msg).toBe(`the field ${field} is required`)
            })
        })
        it(`should return 422 when the required param (languages) is not given`, async () => {
            const dummyData = {
                name: faker.name.firstName(),
                company: faker.company.companySuffix()
            }

            const result = await request(app)
                .post(`/developers`)
                .send(dummyData)
                .set("Accept", /application\/json/)

            expect(result.status).toBe(422)
            expect(result.body.msg).toBe(`you must provide at least one skill`)
        })
        it("should return 422 when the developer is already stored in database", async () => {
            const name = "Marcus"

            const dummyData = {
                name,
                company: faker.company.companySuffix(),
                languages: [faker.name.firstName(), faker.name.firstName(), faker.name.firstName()]
            }

            await request(app)
                .post(`/developers`)
                .send(dummyData)
                .set("Accept", /application\/json/)

            const dummyDataTest = {
                name,
                company: faker.company.companySuffix(),
                languages: [faker.name.firstName(), faker.name.firstName(), faker.name.firstName()]
            }

            const result = await request(app)
                .post(`/developers`)
                .send(dummyDataTest)
                .set("Accept", /application\/json/)

            expect(result.status).toBe(422)
            expect(result.body.msg).toBe(`The developer ${name} is already stored in the database`)
        })
    })

    describe("_storeOrReturnCompany method", () => {
        it("should return the stored company when is stored previously", async () => {
            const name = faker.company.companySuffix()
            const company = await models.companies.create({
                name
            })
            const response = await developersController._storeOrReturnCompany(name)

            expect(response.id).toBe(company.id)
            expect(response.name).toBe(company.name)
        })
        it("should store and return the stored company when is not stored yet", async () => {
            const name = faker.company.companySuffix()

            let fetchByName = await models.companies.findOne({ where: { name } })
            expect(fetchByName).toBe(null)
            const response = await developersController._storeOrReturnCompany(name)
            fetchByName = await models.companies.findOne({ where: { name } })
            expect(response.id).toBe(fetchByName.id)
            expect(response.name).toBe(fetchByName.name)
        })
    })
    describe("_storeOrReturnLanguage method", () => {
        it("should return the stored skill when is stored previously", async () => {
            const description = faker.company.companySuffix()
            const company = await models.skills.create({
                description
            })
            const response = await developersController._storeOrReturnLanguage(description)

            expect(response.id).toBe(company.id)
            expect(response.description).toBe(company.description)
        })
        it("should store and return the stored skill when is not stored yet", async () => {
            const description = "Javascript"

            let fetchByDescription = await models.skills.findOne({ where: { description } })
            expect(fetchByDescription).toBe(null)
            const response = await developersController._storeOrReturnLanguage(description)
            fetchByDescription = await models.skills.findOne({ where: { description } })

            expect(response.id).toBe(fetchByDescription.id)
            expect(response.description).toBe(fetchByDescription.description)
        })
    })
    describe("_wrapLanguagesInPromise method", () => {
        it("should return an array of skills promises", async () => {
            const skills = ["Javascript", "Java"]
            const arrayOfPromises = developersController._wrapLanguagesInPromise(skills)
            const resolvedPromises = await Promise.all(arrayOfPromises)
            expect(arrayOfPromises.length).toBe(2)
            expect(resolvedPromises.length).toBe(2)
        })
    })
})
