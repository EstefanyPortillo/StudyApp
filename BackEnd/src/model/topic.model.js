const {DataTypes} = require('sequelize');
const {sequelize}= require('../connection');
const TopicsModel = sequelize.define('Topics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },{
    tableName:'topics',
    timestamps:false
  });

module.exports={
    TopicsModel
};