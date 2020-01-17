const { clientes, enderecos , telefones} = require('../../../models')

const tools = require('../../../Support/Tool')
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
    // 'cidade',
    //'uf',
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
  /*const cliente = await clientes.findOne({ 
    where: { id: idCliente }
})*/

  const cliente = await clientes.findByPk(idCliente, {
    include: [
      {
        model: telefones
      },
      {
        model: enderecos
      },
      
    ]
  })

  return cliente
}

exports.getGerais = async (req) => {
  const { idCliente } = req.params
  const cliente = await clientes.findOne({ 
    where: { id: idCliente }
})
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

    switch (foundCliente) {
      case false:
        return 'cliente não encontrado'
        break
      case true:        
        let informacao_gerais = await salvarGeral(body)

        switch(informacao_gerais.status) {
          case true:
            let informacoes_telefones = await consultarTelefones(body)
            console.log('aqui =>',informacoes_telefones)
            break
          default:
            console.log('aqui xxx-----xxx')      
        }
      }
  }
}

salvarGeral = async (informacoes_gerais) =>{
  const result = await clientes.upsert(informacoes_gerais)
  .then((resp) => {
    if (resp == false) {
      return {
        status: true
      }
    }
  }).catch((error) => {
    const {errors} = error
    let fieldMsg = []
    for (i in errors) {
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

consultarTelefones = async (cliente) => {
 const { id } = cliente
 let lista_telefones = cliente.telefones

  for(i in lista_telefones) {
    switch ("id" in lista_telefones[i]) {
      case true:        
        const foundTelefone = await telefones.findOne({ where: {
          id: lista_telefones[i].id

        }})
          .then((result) => {
            if (result == null) {
              return false

            } else {
              return true
            }
          })

        const inserindo_atualizando = foundTelefone ? 
          atualizarTelefones(lista_telefones[i]) : 
          console.log('telefone não foi encontrado para ser atualizado')
        break 
      case false:
        let telefoneNovo = {
          clienteId:id,
          telefone: lista_telefones[i].telefone
        }
        console.log(telefoneNovo)
        const inseridos = adicionarTelefones(telefoneNovo)
        return inseridos
    } 
  } 
}

atualizarTelefones = async (telefone) => {  
  const result = await telefones.upsert(telefone)
  .then((resp) => {
    if (resp == false) {
      return {
        status: true
      }
    }
  }).catch((error) => {
    const {errors} = error
    let fieldMsg = []
    for (i in errors) {
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

adicionarTelefones = async (telefone) => {
  const result = await telefones.create(telefone)
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