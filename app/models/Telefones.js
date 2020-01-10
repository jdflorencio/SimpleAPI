module.exports = (sequelize, DataTypes) => {
  const Telefones = sequelize.define('telefones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    telefone : DataTypes.STRING
  })

  return Telefones
}