'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ex_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_of_repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('exercises');
  },
};
