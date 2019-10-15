"use strict"

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("developers", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING
            },
            companyId: {
                type: Sequelize.UUID
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("developers")
    }
}
