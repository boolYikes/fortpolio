const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../config/database")

const Info = sequelize.define(
    "info", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middle_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        preferred_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modified: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            // update is handled by db triggers
        }
    }, 
    {
        freezeTableName: true, // this prevents adding plural 's' to the end of the table
        timestamps: false,
    }// {timestamps: true} can be passed as the 3rd argument if modified is not used
)

module.exports = Info