'use strict';
const { Model } = require('sequelize');
const { options } = require('../routes/userRoute');
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

  Exercise.beforeCreate(
    'beforeInsertingExercise',
    function (exercise, options) {
      const names = ['push ups', 'crunches', 'situps', 'chin ups', 'running'];
      const randomString = DataTypes.UUIDV4;
      console.log(randomString);
      const randomIndex = Math.floor(Math.random() * 5);
      if (exercise.ex_name.toLowerCase() === 'test' || !exercise.ex_name)
        exercise.ex_name = names[randomIndex];
      if (!exercise.no_of_repetitions) exercise.no_of_repetitions = 0;
      if (exercise.time.toLowerCase().includes('sec'))
        exercise.time = exercise.time.replace('sec', 'seconds');
      console.log(exercise.time.toLowerCase().includes('sec'));
    }
  );

  return Exercise;
};
