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
        if(value.length < paramConfig)
        {
          //fieldsError.push({msg: msg.min, field})
          return {msg: msg.min, field}
        }
      },
      max: function(paramConfig, value, field) {
        if(value.length > paramConfig){
          return {msg: msg.max, field}
        }
      },
    }
    return funcoes
  }
}module.exports = processValidation