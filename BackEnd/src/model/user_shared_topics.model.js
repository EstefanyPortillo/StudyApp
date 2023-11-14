const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');
const { UserModel } = require('./user.model'); 
const { TopicModel } = require('./topic.model');  

const SharedTopicsUsersModel = sequelize.define('SharedTopicsUsers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_shared: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id',
    },
  },
  user_recieved: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id',
    },
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TopicModel,
      key: 'id',
    },
  },
}, {
  tableName: 'shared_topics_users',
  timestamps: false,
});

module.exports = {
  SharedTopicsUsersModel
};
