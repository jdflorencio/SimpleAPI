validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    
    tipo: {
        type: DataTypes.ENUM,
        values: ['pf', 'pj'],
        validate: {
          isIn: {
            args: [['pf', 'pj']],
            msg: "Valores informados invalidos"
          }
        }
      },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          msg: "Esse campo não pode ser vazio!"
        }, 
        len: {
          args: [1,60],
          msg: "Esse campo deve ter entre 1 a 60 caracteres"
        }
      }
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          msg: "Esse campo não pode ser vazio!"
        }, 
        len: {
          args: [1,9],
          msg: "Esse campo deve ter entre 1 a 9 caracteres"
        }
      }
    },
    nome_fantasia: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len : {
          args: [1,60],
          msg: "Esse campo deve ter entre 1 a 60 caracteres"
        }        
      }
    },
    // infor pessoas
    data_nascimento: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true, 
          msg: "Essa data não é valida"
        }
      }
    },
    data_fundacao: DataTypes.DATE,
    nacionalidade: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
      }
    },
    estado_civil: DataTypes.STRING,
    rg: DataTypes.STRING,
    cpf_cnpj: DataTypes.STRING,
    inscricao_estadual: DataTypes.STRING,
   
    //  contato
    email : {
      type: DataTypes.STRING,
      allowNull: true,       
      validate: {
        isEmailOrEmpty(val, next) {
          if (!val || val === "" || validateEmail(val)) {
            return next('')
          }
          else {
            return next('Email invalido')
          }
       }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: DataTypes.DATE
  },
  { sequelize, modelName: 'clientes' }
  );
  /*
  Clientes.hasMany(enderecos, {
    foreignKey: 'clientesId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
}) */

Clientes.associate  = function(models) {

  Clientes.hasMany(models.enderecos, {foreignkey: 'clienteId', onDelete: 'cascade', onUpdate: 'NO ACTION'})
  Clientes.hasMany(models.telefones, {foreignkey: 'clienteId', onDelete: 'cascade', onUpdate: 'NO ACTION'} )
}


  return Clientes
}