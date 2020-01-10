module.exports = (sequelize, DataTypes) => {
  const Telefones = sequelize.define('telefones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    clientesId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    telefone: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: DataTypes.DATE
  })

  Telefones.associate  = function(models) {
    Telefones.belongsTo(models.users, {foreignkey: 'clientesId', as: 'clientes'})
  }
    return Telefones
}