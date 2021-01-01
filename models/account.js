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
    get maskBalance(){
      return rupiahFormatter(this.balance)
    }
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: DataTypes.FLOAT,
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
        if(instance.balance < 500000){
          return Promise.reject({
            errors:[{
              message: 'Minimum balance for new Accout: Rp500.000'
            }]
          })  
        }
      },
      beforeUpdate: (instance, options) => {
        if (instance.balance < 0){
          console.log('called')
          return Promise.reject({
            errors:[{
              message: 'Insufficient balance'
            }]
          })
        }
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};