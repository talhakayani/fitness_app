'use strict';
const { Model } = require('sequelize');
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
  return Exercise;
};
