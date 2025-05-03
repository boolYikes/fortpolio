const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../config/database")

const Stack = sequelize.define(
    "stack",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        modified: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Stack