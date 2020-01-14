
module.exports = (sequelize, DataTypes) => {
  const Telefones = sequelize.define('telefones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },    
    telefone : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1,14],
          msg: "Esse campo tem que ter entre 1 á 60 caracteres"
        }
      }
    },
    tipo : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1,10],
          msg: "Esse campo tem que ter entre 1 á 60 caracteres"
        }
      }
    }
  })
 
  Telefones.associate  = function(models) {
    Telefones.belongsTo(models.clientes, {foreignkey: 'clienteId'})
  }

 return Telefones
}