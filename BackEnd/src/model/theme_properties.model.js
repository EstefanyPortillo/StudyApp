const { DataTypes } = require('sequelize');
const { sequelize } = require("../connection");

const ThemePropertiesModel = sequelize.define('ThemeProperties', {

    id: {
        type: DataTypes.INTEGER,
        allownNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    theme_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    property_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    property_value: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},

{
    tableName:'themes_properties',
    timestamps:false
});

module.exports = {
    ThemePropertiesModel
};