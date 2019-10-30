'use strict';

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('users', [{
    name: "João Diego Florencio", 
    email: "jdflorencio@gmail.com",
    password:  bcrypt.hashSync('123456', saltRounds),
    createdAt: new Date(),
    updatedAt: new Date(),
   }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null ,{})
  }
};
