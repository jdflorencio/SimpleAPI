'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      
      return queryInterface.bulkInsert('clientes', [
        // EXEMPLO PESSOA FISICA
        {
          tipo: "pf",
          nome:"Cecília Josefa da Costa",
          data_nascimento: "1987-08-18",
          nacionalidade: "BRASILEIRO",
          estado_civil: "SOLTEIRA",
          rg: "44.295.734-8",
          cpf_cnpj: "036.725.120-52",
          endereco : "Travessa Francisco Alves",
          bairro :  "Marechal Rondon",
          numero :  555,
          complemento : "perto da mercado da esquina",
          cidade:"Salvador",
          uf: "BA",
          email : "cceciliajosefadacosta@panevale.com.br",
          telefone : "(71)2897-7557",
          celular: "(71)98273-7852",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // EXEMPO PESSOA JURIDICA
        {
          tipo: "pj",
          nome: "Lorenzo e Sarah Eletrônica ME",
          nome_fantasia: "ELETRONICA LORENZO",
          data_fundacao: "2014-03-26",
          cpf_cnpj: "30471270000141",
          inscricao_estadual:"508.278.225.430",
          endereco : "Rua Álvaro Barbosa",
          bairro: "Jardim São Lucas",
          numero:"468",
          complemento:"CLIENTE PESSOA JURIDICA 1",
          cidade: "Pirassununga",
          uf:"SP",
          email:"posvenda@lorenzoesaraheletronicame.com.br",
          telefone:"(19)2900-3467",
          celular:"(19)99180-7025",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkDelete('clientes', null, {});
  }
};
