const {DataTypes} = require('sequelize');
const {sequelize}= require('../connection');
const ThemesModel = sequelize.define('Themes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    tableName:'themes',
    timestamps:false
  });

module.exports={
    ThemesModel
};