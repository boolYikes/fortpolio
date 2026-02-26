const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Trait = sequelize.define(
  'trait',
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

module.exports = Trait;
