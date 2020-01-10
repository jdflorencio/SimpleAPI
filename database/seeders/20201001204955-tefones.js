'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {       
    return queryInterface.bulkInsert('telefones', [
      
      
      {
        clientesId: 1,
        telefone:"(19)2900-3467",        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        clientesId: 1,
        telefone:"(19)2900-3467",        
        createdAt: new Date(),
        updatedAt: new Date(),
      }], 
    {})

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('telefones', null, {});
  }
};
