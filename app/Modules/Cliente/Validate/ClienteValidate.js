const processValidation = require('../../../Support/ProcessValidation')
class Validator extends processValidation{
  constructor(data) {
    super()    
  }

  object(data) {
    let result = this.validate(this.validationParameters(), data, this.messageException())
    if (Array.isArray(result) && result.length > 0)
    {
      let fieldsMsg = {status: 401, fields: result}
      return fieldsMsg

    } else {
      return false
    }
  }

  validationParameters() {
    const validate = {
      tipo:{
        min:1,
        max: 60
      },
      nome:{
        min:1,
        max: 60
      },
      // sexo:{
      //   min:1,
      //   max: 60
      // },
      nome_fantasia:{
        min:1,
        max: 60
      }, 
      data_nascimento:{
        datePtBr : true
      },
      data_fundacao:{
        datePtBr : true
      },
      nacionalidade:{
        min:1,
        max: 60
      },
      estado_civil:{
        multiplos: ["SOLTEIRO","CASADO"]
      },
      // rg:{
      //   min:1,
      //   max: 60
      // },
      cpf_cnpj:{
        min:1,
        max: 60,
        cnpj: true,
        cpf: true
      }, 
      inscricao_estadual:{
        min:1,
        max: 60,
        inscricao_estudal: true
      }, 
      email:{
        min:1,
        max: 60,
        email: true
      }
    }
    return validate
  }

  messageException() {
    const msg = {
      min: "Esse campo não pode ser menor quer 1",
      max: "Esse campo não aceita valores Maiores quer 2",
      cnpj: "Digite um CNPJ valido!",
      cpf: "Digite um CPF valido!",
      inscricao_estadual: "Digite uma Inscrição Estudual valida!",
      email: "O email não esta valido",
      mutiplos: "Esse valor não é aceito em nosso cadastro."
    }
    return msg
  }
}

let validar = new Validator()
module.exports = validar