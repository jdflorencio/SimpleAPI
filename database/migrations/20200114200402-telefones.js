'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('telefones', {
      id: {
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER, 
      },
      clienteId: {
        allowNull: false, 
        references: {
          model:'clientes',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER, 
      },
      telefone : {
        allowNull: true,
        type: Sequelize.STRING
      },
      tipo : {
        allowNull: true,
        type: Sequelize.STRING
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
      return queryInterface.dropTable('telefones')
  }
};
