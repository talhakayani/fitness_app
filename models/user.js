'use strict';
const { Model } = require('sequelize');
const randomString = require('../helper/helperFunctions');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );

  User.beforeCreate('userInformation', function (user, options) {
    console.log(`Creating user..`);
    if (!user.name || user.nmae.toLowerCase().includes('test')) {
      user.name = randomString.generateRandomString(10);
    }
    if (!user.age || user.age < 18) {
      user.age = 18;
    }
    if (user.weight % 1 === 0) {
      user.weight = parseFloat(user.weight + '.0');
    }
    if (user.height % 1 === 0) {
      user.weight = parseFloat(user.weight + '.0');
    }

    console.log('User information created!');
  });

  User.afterCreate('userInformationInserted', function (user, options) {
    console.log('User Information Inserted Succesfully');
  });

  return User;
};
