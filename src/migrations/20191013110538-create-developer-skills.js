"use strict"

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("developer-skills", {
            developerId: {
                type: Sequelize.UUID
            },
            skillId: {
                type: Sequelize.UUID
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("developer-skills")
    }
}
