'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clientes', {
      id: {
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER, 
      }, 
      tipo: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['pf', 'pj']
      },
      nome: {
        allowNull: true,
        type: Sequelize.STRING(60)
      },
      nome_fantasia: {
        allowNull: true,
        type: Sequelize.STRING(60),
      },
      // infor pessoas
      data_nascimento: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      data_fundacao: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      nacionalidade: {
        allowNull: true,
        type: Sequelize.STRING(30)
      },
      estado_civil: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      rg: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      cpf_cnpj: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      inscricao_estadual: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      // endereço
      endereco : {
        allowNull: true,
        type: Sequelize.STRING
      },
      bairro : {
        allowNull: true,
        type: Sequelize.STRING(60)
      },
      numero : {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      complemento : {
        allowNull: true,
        type: Sequelize.STRING
      },
      cidade : {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      uf : {
        allowNull: true,
        type: Sequelize.STRING(2)
      },
      //  contato
      email : {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      telefone : {
        allowNull: true,
        type: Sequelize.STRING(14)
      },
      celular : {
        allowNull: true,
        type: Sequelize.STRING(14)
      },
      createdAt: {
        allowNull: false, 
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false, 
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('clientes');
  }
};