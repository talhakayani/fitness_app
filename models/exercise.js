'use strict';
const { Model } = require('sequelize');
const helper = require('../helper/helperFunctions');

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exercise.init(
    {
      ex_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      no_of_repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'exercises',
      modelName: 'Exercise',
    }
  );

  Exercise.beforeCreate('exerciseInformation', function (exercise, options) {
    console.log(`Creating Exercise information...`);
    if (!exercise.ex_name || exercise.ex_name.toLowerCase().includes('test')) {
      exercise.ex_name = helper.generateRandomString(10);
    }
    if (!exercise.no_of_repetitions || exercise.no_of_repetitions < 0) {
      exercise.no_of_repetitions = 0;
    }
    if (exercise.time.toLowerCase().includes('sec')) {
      exercise.time = exercise.time.replace('sec', 'seconds');
    }
    console.log('Exercise information created, ready for insertion');
  });

  Exercise.afterCreate(
    'exerciseInformationCreated',
    function (exercise, options) {
      console.log('Exercise Inserted!');
    }
  );
  return Exercise;
};
