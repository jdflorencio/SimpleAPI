'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('telefones', [
      {
        clienteId: 1,
        telefone : "(73)99115-6650",
        tipo: "Celular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clienteId: 1,
        telefone : "(73)3013-5050",
        tipo: "Fixo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clienteId: 2,
        telefone : "(73)3291-1111",
        tipo: "Fixo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clienteId: 2,
        telefone : "(73)3291-1112",
        tipo: "Fixo",
        createdAt: new Date(),
        updatedAt: new Date(),      
      },
     
      
    ],
    {})
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('telefones', null, {});
  }
};
