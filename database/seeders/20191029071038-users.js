'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('users', [{
    name: "João Diego Florencio", 
    email: "jdflorencio@gmail.com",
    password: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
   }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null ,{})
  }
};
