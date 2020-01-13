'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('enderecos', [
      {
        clientesId: 1,
        endereco : "Travessa Francisco Alves",
        bairro :  "Marechal Rondon",
        numero :  555,
        complemento : "perto da mercado da esquina",
        cidade:"Salvador",
        uf: "BA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clientesId: 2,
        endereco : "Rua Álvaro Barbosa",
        bairro: "Jardim São Lucas",
        numero:"468",
        complemento:"CLIENTE PESSOA JURIDICA 1",
        cidade: "Pirassununga",
        uf:"SP",
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    {})
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('endenrecos', null, {});
  }
};
