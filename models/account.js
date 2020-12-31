'use strict';
const {
  Model
} = require('sequelize');
const generateAccountNumber = require('../helpers/generateAccountNumber')

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: DataTypes.STRING,
    accountNumber: DataTypes.FLOAT,
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        if (!instance.accountNumber){
          instance.accountNumber = generateAccountNumber()
        }
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};