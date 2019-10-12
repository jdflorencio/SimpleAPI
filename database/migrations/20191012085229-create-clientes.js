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
        allowNull: false,
        type: Sequelize.DATE
      },
      data_fundacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nacionalidade: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      estado_civil: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      rg: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      cpf_cnpj: {
        allowNull: false,
        type: Sequelize.STRING(14)
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
        type: Sequelize.STRING(12)
      },
      celular : {
        allowNull: true,
        type: Sequelize.STRING(12)
      },
      createdAt: {
        allowNull: false, 
        type: Sequelize.DATE
      },
      updateAt: {
        allowNull: false, 
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('clientes');
  }
};
