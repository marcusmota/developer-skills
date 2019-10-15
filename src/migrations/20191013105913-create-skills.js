"use strict"

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("skills", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            description: {
                type: Sequelize.STRING
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("skills")
    }
}
