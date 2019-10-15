"use strict"

const uuid = require("uuid/v4")

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
        "companies",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            name: DataTypes.STRING
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
