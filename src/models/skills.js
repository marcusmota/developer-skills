"use strict"

const uuid = require("uuid/v4")

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
        "skills",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            description: DataTypes.STRING
        },
        { timestamps: false }
    )

    model.beforeCreate((entity, _) => {
        return (entity.id = uuid())
    })

    model.associate = function(models) {
        // associations can be defined here
        model.belongsToMany(models.developers, { as: "developers", through: "developer-skills", foreignKey: "skillId" })
    }
    return model
}
