const models = require("./../../models")
const request = require("supertest")
const app = require("../../app")

const storeHelper = async () => {
    const javascript = await models.skills.create({
        description: "Javascript"
    })

    const java = await models.skills.create({
        description: "Java"
    })

    const dotnet = await models.skills.create({
        description: "dotnet"
    })

    const developer = await models.developers.create({
        name: "Marcus Mota"
    })

    const cloudoki = await models.companies.create({
        name: "cloudoki"
    })

    await developer.setCompany(cloudoki)
    await developer.setSkills([javascript])

    const aws = await models.companies.create({
        name: "aws"
    })

    const anotherDeveloper = await models.developers.create({
        name: "Kimberly"
    })

    await anotherDeveloper.setCompany(aws)
    await anotherDeveloper.setSkills([dotnet, java, javascript])
}
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
        /*
        Seeder function to store the expected answer
        */
        await storeHelper()
    })

    describe("GET /fetch-skills-with-companies", () => {
        it("should return 200 with the languages and the companies using it", async () => {
            const result = await request(app)
                .get(`/fetch-skills-with-companies`)
                .set("Accept", /application\/json/)

            const possibleCompanies = ["cloudoki", "aws"].sort()
            const possibleSkills = ["Javascript", "Java", "dotnet"].sort()
            const returnedSkills = result.body.map(skill => skill.language).sort()

            result.body.forEach(sk => {
                if (sk === "Javascript") {
                    expect(sk.companies.sort()).toEqual(possibleCompanies)
                } else if (sk === "Java") {
                    expect(sk.companies.sort()).toEqual(["aws"])
                } else if (sk === "dotnet") {
                    expect(sk.companies.sort()).toEqual(["aws"])
                }
            })
            expect(result.status).toBe(200)
            expect(returnedSkills).toEqual(possibleSkills)
        })
    })
    describe("GET /fetch-skills-count", () => {
        it("should return 200 with the languages and the count of developers using it", async () => {
            const result = await request(app)
                .get(`/fetch-skills-count`)
                .set("Accept", /application\/json/)
            expect(result.body["Java"]).toBe(1)
            expect(result.body["Javascript"]).toBe(2)
            expect(result.body["dotnet"]).toBe(1)
            expect(Object.keys(result.body).length).toBe(3)
        })
    })
})
