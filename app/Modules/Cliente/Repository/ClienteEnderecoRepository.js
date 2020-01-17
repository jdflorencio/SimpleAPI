const { clientes, enderecos} = require('../../../models')


const tools = require('../../../Support/Tool')
exports.getAll = async (req) => {
  const { idCliente } = req.params
  const allEnderecos = await enderecos.findAll({where:
    { clienteId: idCliente}
  })
  return allEnderecos
}

exports.getEndereco = async (req) => {
  const { idCliente, idEndereco } = req.params
  const endereco = await enderecos.findOne({ 
    where: { id: idEndereco }
})
  return endereco
}

exports.addEndereco = async (req) => {
  const { body } = req		
  const result = await enderecos.create(body)
    .then((resp) => {
      if (resp != null) {
        return {
          status: 201,
          id: resp.null,
          msg : "Endereeço cadastrado com sucesso!" 
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

exports.update = async (req) => {
  const { body } = req
  if (body.id) {
    const foundEndereco = await enderecos.findOne({ where: {
      id: body.id
    }})
    .then((result) =>{
      if (result == null) {
        return false
      } else {
        return true
      }
    })

    if (foundEndereco == false) {
      return "Endereço não encontrado!"
    } else {
      const result = await endereco.upsert(body)
        .then((resp) => {
          if (resp == false) {
            return {
              status: 200,
              msg: "Endereço atualizado com sucesso!"
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
   return "Endereço não encontrado!"
  }
}

exports.deleting = async (req) => {
  const { idCliente, idEndereco } = req.params
  const msg = await clientes.destroy({ where: {
    id: idEndereco
  }})
  .then((result) => { 
    if (result == 0) {
      return {
        status: 401,
        msg: "Cliente não encontrado!"
      }			
    } else {
      return {
        status: 200,
        msg: "Cliente removido com sucesso!"

      }
    }
  })
  .catch((error) => {
    return error
  })
  return msg
}

exports.ufList = async (req) => {
  
  return msg
}