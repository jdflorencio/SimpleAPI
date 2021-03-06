'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {       
    return queryInterface.bulkInsert('clientes', [
      
      // EXEMPLO PESSOA FISICA
      {
        tipo: "pf",
        //userId: 1,
        nome:"Cecília Josefa da Costa",
        data_nascimento: "1987-08-18",
        nacionalidade: "BRASILEIRO",
        estado_civil: "SOLTEIRA",
        rg: "44.295.734-8",
        cpf_cnpj: "036.725.120-52",
        sexo: "feminino",
        /*endereco : "Travessa Francisco Alves",
        bairro :  "Marechal Rondon",
        numero :  555,
        complemento : "perto da mercado da esquina",
        cidade:"Salvador",
        uf: "BA",*/
        email : "cceciliajosefadacosta@panevale.com.br",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // EXEMPO PESSOA JURIDICA
      {
        tipo: "pj",
        //userId: 1,
        nome: "Lorenzo e Sarah Eletrônica ME",
        nome_fantasia: "ELETRONICA LORENZO",
        data_fundacao: "2014-03-26",
        cpf_cnpj: "30471270000141",
        inscricao_estadual:"508.278.225.430",
       /* endereco : "Rua Álvaro Barbosa",
        bairro: "Jardim São Lucas",
        numero:"468",
        complemento:"CLIENTE PESSOA JURIDICA 1",
        cidade: "Pirassununga",
        uf:"SP",*/
        email:"posvenda@lorenzoesaraheletronicame.com.br",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], 
    {})

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clientes', null, {});
  }
};
