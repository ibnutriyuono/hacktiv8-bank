'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Customers', [
     {
        identityNumber: '1234123412341234',
        fullName: 'Lee Saerom',
        address: 'Cikutra',
        birthDate: new Date(),
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        identityNumber: '1235123512351235',
        fullName: 'Park Jiwon',
        address: 'Cikutra',
        birthDate: new Date(),
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
     },
   ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
