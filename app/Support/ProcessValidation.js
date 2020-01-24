class processValidation {

  validate(validate, body, messageExcecion ) {
    let fieldsError =[]
		let funcoes = this.rules(messageExcecion)
    let fields = Object.keys(validate)
    fields.map( field => {
      let attrValidation = Object.keys(validate[field])
      attrValidation.map((method) => {
        
        var inv = funcoes[method]( validate[field][method], body[field], field )
        if (inv !== undefined) {
          fieldsError.push(inv)
          
        }
      })
    })
    return fieldsError
  }

  rules(msg) {
    const funcoes = {
      min: function(paramConfig, value, field) {
        console.log('|||======>', value)
        if(value.length < paramConfig && value != null)
        {
          return {msg: msg.min, field}
        }
      },
      max: function(paramConfig, value, field) {
        if(value.length > paramConfig && value != null){
          return {msg: msg.max, field}
        }
      },
      cpf: function(paramConfig, value, field) {
          console.log("||||=======|>>CPF",paramConfig, value, field)

      },
      cnpj: function(paramConfig, value, field) {
        console.log("||||=======|>>CNPJ",paramConfig, value, field)

      },
      sexo: function(paramConfig, value, field) {
        console.log("||||=======|>>SEXO - ",paramConfig, value, field)
      },
      multiplos: function(paramConfig, value, field) {
        console.log("||||=======|>>MUTIPLOS",paramConfig, value, field)
      },
      email: function(paramConfig, value, field) {
        console.log("||||=======|>>email",paramConfig, value, field)
      },
      datePtBr: function(paramConfig, value, field) {
        console.log("||||=======|>>data formato do brasil",paramConfig, value, field)
      }

    }
    return funcoes
  }
}module.exports = processValidation