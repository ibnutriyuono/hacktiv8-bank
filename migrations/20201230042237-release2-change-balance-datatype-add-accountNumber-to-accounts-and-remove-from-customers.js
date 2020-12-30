'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Accounts', 'balance', {
        type: 'FLOAT USING CAST("balance" as FLOAT)'
      }),
      queryInterface.addColumn('Accounts', 'accountNumber', Sequelize.STRING),
      queryInterface.removeColumn('Customers', 'accountNumber')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Accounts', 'balance', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Accounts', 'accountNumber'),
      queryInterface.addColumn('Customers', 'accountNumber', Sequelize.STRING)
    ])
  }
};
