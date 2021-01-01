'use strict';
const {
  Model
} = require('sequelize');
const generateAccountNumber = require('../helpers/generateAccountNumber')
const rupiahFormatter = require('../helpers/rupiahFormatter')

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // get maskBalance(){
    //   return rupiahFormatter(this.balance)
    // }
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type: DataTypes.STRING,
      validate:{
        lessThan500k(value){
          if(value < 500000){
            throw new Error('Minimum balance for new Accout: Rp500.000')
          }
        }
      }
    },
    accountNumber: DataTypes.FLOAT,
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        if (!instance.accountNumber){
          instance.accountNumber = generateAccountNumber()
        }
        if(!instance.balance){
          instance.balance = 500000
        }
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};