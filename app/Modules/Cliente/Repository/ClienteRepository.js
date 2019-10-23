const { clientes } = require('../../../models')
exports.getAll = async (req) => {
  const allClientes = await clientes.findAll({attributes: [
    'id',
    'tipo',
    'nome',
    'nome_fantasia',
    // infor pessoas
    // 'data_nascimento',
    // 'data_fundacao',
    // 'nacionalidade',
    // 'estado_civil',
    // 'rg',
    // 'cpf_cnpj',
    // 'inscricao_estadual',
    // endereço
    // 'endereco',
    // 'bairro',
    // 'numero',
    // 'complemento',
    'cidade',
    'uf',
    //  contato
    // 'email',
    // 'telefone',
    // 'celular',
    'createdAt',	
    'updatedAt',]})
  return allClientes
}

exports.getCliente = async (req) => {
  const { idCliente } = req.params
  const cliente = await clientes.findOne({ where: {
    id: idCliente
  }})
  return cliente
}

exports.addCliente = async (req) => {
  const { body } = req		
  const result = await clientes.create(body)
    .then((resp) => {
      if (resp != null) {
        return {
          status: 201,
          id: resp.null,
          msg : "Cliente cadastrado com sucesso!" 
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
    const foundCliente = await clientes.findOne({ where: {
      id: body.id
    }})
    .then((result) =>{
      if (result == null) {
        return false
      } else {
        return true
      }
    })

    if (foundCliente == false) {
      return "cliente não encontrado!"
    } else {
      const result = await clientes.upsert(body)
        .then((resp) => {
          if (resp == false) {
            return {
              status: 200,
              msg: "Cliente atualizado com sucesso!"
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
   return "cliente não encontrado!"
  }
}

exports.deleting = async (req) => {
  const { idCliente } = req.params
  const msg = await clientes.destroy({ where: {
    id: idCliente
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