const { telefones } = require('../../../models')

exports.getTelefone = async (req) => {
  const { idCliente } = req.params
  const telefone = await telefones.findAll({ where: {
    clienteId: idCliente
  }}) 
  return telefone;
}

exports.addTelefone = async (req) => {
  const { body } = req
  const result = await telefones.create(body)
    .then((resp) => {
      if (resp != null) {
        return {
          status: 201,
          id: resp.null,
          msg: "Telefone adicionado com sucesso!" 
        }
      }
    })
    .catch((error) => {
      const {errors} = error
      let fieldMsg = []
      // for (i in errors)
      // {
      //     fieldMsg.push({
      //       msg: errors[i].message,
      //       field: errors[i].path
      //     })            
      // }
      fieldMsg.push({error})
      return {
        status: 401,
        errors: fieldMsg
      }
    })
  return result
}

exports.update = async (req) => {
  const { body } = req    
  if (body.id) {
    const foundTelefone = await telefones.findOne({ where: {
      id: body.id
    }})
    .then((result) =>{
      if (result == null) {
        return false
      } else {
        return true
      }
    })

    if (foundTelefone == false) {
      return "Telefone não encontrado!"
    } else {
      
      const result = await telefones.upsert(body)
        .then((resp) => {
          if (resp == false) {
            return {
              status: 200,
              msg: "telefone atualizado com sucesso!"
            }
          }
        })
        .catch((error) => {
          const {errors} = error
          let fieldMsg = []
          for (i in errors)
          {
              fieldMsg.push({
                msg: errors[i].message,
                field: errors[i].path
              })            
          }          
          return {
            status: 401,
            errors: fieldMsg
          }
        })
        return result
    }
  } else {
   return "telefone não encontrado!"
  }
}

exports.deleting = async (req) => {

  
  
  const { idTelefone } = req.params
  const msg = await telefones.destroy({ where: {
    id: idTelefone
  }})
  .then((result) => { 
    if (result == 0) {
      return {
        status: 401,
        msg: "Telefone não encontrado!"
      }			
    } else {
      return {
        status: 200,
        msg: "telefone removido com sucesso!"
      }
    }
  })
  .catch((error) => {
    return error
  })
  return msg
}