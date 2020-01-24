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
      nome: {
        min:1, 
        max: 2
      },

    }
    return validate
  }

  messageException() {
    const msg = {
      min: "Esse campo não pode ser menor quer 1",
      max: "Esse campo não aceita valores Maiores quer 2"
    }
    return msg
  }
}

let validar = new Validator()
module.exports = validar