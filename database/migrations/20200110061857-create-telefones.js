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
        type: Sequelize.INTEGER, 
      },
      telefone : {
        allowNull: true,
        type: Sequelize.STRING(14)
      },
    })
  },

  down: (queryInterface) => {
    queryInterface.dropTable('telefones')
  }
};
