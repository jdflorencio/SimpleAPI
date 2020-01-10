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
    usersId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
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
    // endereço
    
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
    telefone : DataTypes.STRING,
    celular : DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: DataTypes.DATE
  });
  Clientes.associate  = function(models) {
    Clientes.belongsTo(models.users, {foreignkey: 'usersId', as: 'users'})
  }
  return Clientes;
}