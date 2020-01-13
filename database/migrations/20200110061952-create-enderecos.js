'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('enderecos', {
      id: {
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER, 
      }, 
      clientesId: {
        allowNull: false, 
        references: {
          model:'clientes',
          key: 'id'
        },
        type: Sequelize.INTEGER, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
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
      createdAt: {
        allowNull: false, 
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false, 
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('enderecos')
  }
};
