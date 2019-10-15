const skillRepository = require("./../../repository/skills")
const models = require("./../../models")
const faker = require("faker")

const insertNSkills = async n => {
    let p = []

    for (let i = 0; i < n; i++) {
        const data = {
            description: faker.name.firstName()
        }

        p.push(models.skills.create(data))
    }

    await Promise.all(p)

    return
}

describe("skills repository tests", () => {
    beforeEach(async () => {
        models.skills.destroy({ where: {} })
    })

    describe("store method", () => {
        it("should store a new skill", async () => {
            const description = "Javascript"
            let skill = await skillRepository.store({
                description
            })
            expect(skill.description).toBe(description)
            expect(skill).toHaveProperty("id")
        })
    })

    describe("fetch method", () => {
        it("it should return an array with length of 10", async () => {
            const size = 10

            await insertNSkills(size)

            let skills = await skillRepository.fetch()
            expect(skills).toHaveLength(size)
        })
    })

    describe("fetchByDescription method", () => {
        it("should return an object based on its description", async () => {
            await insertNSkills(10)

            const description = "Javascript"

            await models.skills.create({
                description
            })
            let skills = await skillRepository.fetchByDescription(description)
            expect(skills.description).toBe(description)
        })
        it("should not return an object when the description is not stored in database", async () => {
            await insertNSkills(10)

            const description = "Javascript"

            let skills = await skillRepository.fetchByDescription(description)
            expect(skills).toBe(null)
        })
    })

    describe("fetchSkillsWithCompaniesUsingIt method", () => {
        it("should return an array of skills with the developers array that are using it", async () => {
            const skill = await models.skills.create({
                description: "Javascript"
            })
            const developer = await models.developers.create({
                name: "Marcus Mota"
            })
            const company = await models.companies.create({
                name: "cloudoki"
            })

            await developer.setSkills([skill])
            await developer.setCompany(company)

            const skills = await skillRepository.fetchSkillsWithCompaniesUsingIt()
            expect(skills[0].developers[0].company.name).toBe(company.name)
            expect(skills[0].developers[0].name).toBe(developer.name)
            expect(skills[0].description).toBe(skill.description)
        })
    })

    describe("fetchSkillsWithCount method", () => {
        it("should return an array of languages with the count of developers that are using it", async () => {
            const skill = await models.skills.create({
                description: "Javascript"
            })

            const anotherSkill = await models.skills.create({
                description: "Java"
            })

            const developer = await models.developers.create({
                name: "Marcus Mota"
            })
            const anotherDeveloper = await models.developers.create({
                name: "Kimberly"
            })
            const company = await models.companies.create({
                name: "cloudoki"
            })

            await developer.setSkills([skill])
            await developer.setCompany(company)

            await anotherDeveloper.setSkills([skill, anotherSkill])
            await anotherDeveloper.setCompany(company)

            const skills = await skillRepository.fetchSkillsWithCount()
            expect(skills[0].language).toBe("Javascript")
            expect(skills[0].total).toBe(2)
            expect(skills[1].language).toBe("Java")
            expect(skills[1].total).toBe(1)
            expect(skills.length).toBe(2)
        })
    })
})
