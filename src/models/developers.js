"use strict"

const uuid = require("uuid/v4")

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("developers", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        companyId: DataTypes.UUID
    })

    model.beforeCreate((entity, _) => {
        return (entity.id = uuid())
    })

    model.associate = function(models) {
        // associations can be defined here
        model.belongsToMany(models.skills, { as: "skills", through: "developer-skills", foreignKey: "developerId" })
        model.belongsTo(models.companies, { as: "company", foreignKey: "companyId", targetKey: "id" })
    }
    return model
}
