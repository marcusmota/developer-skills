"use strict"

const uuid = require("uuid/v4")

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
        "developer-skills",
        {
            developerId: DataTypes.UUID,
            skillId: DataTypes.UUID
        },
        { timestamps: false }
    )

    model.beforeCreate((entity, _) => {
        return (entity.id = uuid())
    })

    model.associate = function(models) {
        // associations can be defined here
    }
    return model
}
