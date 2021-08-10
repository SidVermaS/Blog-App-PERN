// const {posts}=require('../../constants/tables.constant')
// const {Posts}=require('../models/posts.model.ts')
const {DataTypes} = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('posts',  
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      caption: {
        type: DataTypes.TEXT,
      },
      photo_url: {
        type: DataTypes.STRING,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      }
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('posts')
  }
};
