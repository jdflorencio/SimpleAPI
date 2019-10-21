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
    data_nascimento: DataTypes.DATE,
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
    endereco : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len : {
          args: [1,100],
          msg: "Esse campo tem que ter entre 1 á 100 caracteres"
        }
      }
    },
    bairro : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1,60],
          msg: "Esse campo tem que ter entre 1 á 60 caracteres"
        }
      }
    },
    numero : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1,10],
          msg: "Esse campo tem que ter entre 1 á 10 caracteres"
        }
      }
    },
    complemento : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1,100],
          msg: "Esse campo tem que ter entre 1 á 100 caracteres"
        }
      }
    },
    cidade : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1,100],
          msg: "Esse campo tem que ter entre 1 á 6x caracteres"
        }
      }
    },
    uf : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [[
          'AC',
          'AL',
          'AP',
          'AM',
          'BA',
          'CE',
          'DF',
          'ES',
          'GO',
          'MA',
          'MT',
          'MS',
          'MG',
          'PA',
          'PB',
          'PR',
          'PE',
          'PI',
          'RJ',
          'RN',
          'RS',
          'RO',
          'RR',
          'SC',
          'SP',
          'SE',
          'TO']
        ],
        msg: "Esse estado federativo não existe!"
      }
    }
    },
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
  return Clientes;
}