const { clientes, enderecos , telefones} = require('../../../models')


const tools = require('../../../Support/Tool')
exports.getAll = async (req) => {
  const allTelefones = await clientes.findAll({attributes: [
  'id',
  'clienteId',
  'telefone',
  'tipo',
  'createdAt',
  'updatedAt'
]})

  return allTelefones
}

exports.getTelefone = async (req) => {
  const {idCliente, idTelefone } = req.params
  const telefone = await telefones.findOne({ 
    where: { id: idTelefone }
})
  return telefone
}

exports.addTelefone = async (req) => {
  const { body } = req		
  const result = await telefones.create(body)
    .then((resp) => {
      if (resp != null) {
        return {
          status: 201,
          id: resp.null,
          msg : "telefone cadastrado com sucesso!" 
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
      return "telefone não encontrado!"
    } else {
      const result = await telefones.upsert(body)
        .then((resp) => {
          if (resp == false) {
            return {
              status: 200,
              msg: "Telefone atualizado com sucesso!"
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
   return "Telefone não encontrado!"
  }
}

exports.deleting = async (req) => {
  const { clienteId, id } = req.params
  const msg = await telefones.destroy({ where: {
    id: id
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
        msg: "Telefone removido com sucesso!"

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