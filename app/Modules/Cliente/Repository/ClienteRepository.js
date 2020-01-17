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
  console.log('aqui', req.body)
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
        errors: error
      }
    })

    console.log(result)
  return result
}

exports.update = async (req) => {
  console.log('aqui')
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
    switch ( foundCliente ) {
      case false:
        console.log('mão encontrado')
        break
      case true:
        let informacao_gerais = await salvarGeral(body)

        console.log(informacao_gerais)

        switch(informacao_gerais.status) {
          case true:
            console.log('123465')
            let informacoes_telefones = await consultarItensTableFilho(body, 'telefones')
            let informacoes_enderecos = await consultarItensTableFilho(body, 'enderecos')    
            break    
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

consultarItensTableFilho = async (cliente, table) => {  
  const { id } = cliente
  let lista = table === "enderecos"? cliente.enderecos : cliente.telefones

  const tabelaSelecionada = table === "enderecos"? enderecos : telefones  
  for(i in lista) {    
    switch ("id" in lista[i]) {
      case true:
        const registroEncontrado = await tabelaSelecionada.findOne({ where: {
          id: lista[i].id

        }})
        .then((result) => {
          if (result == null) {
            return false
          } else {
            return true
            }
          })

        switch (registroEncontrado) {
          case true:
            const inserindo_atualizando = await atualizarTelefones(lista[i], table)
          case false:
            console.log('telefone não foi encontrado para ser atualizado')
        }
        
        break 
          
        case false:  
           
          switch(table) {
            case 'telefones':
              let telefoneNovo = {
                clienteId:id,
                telefone: lista[i].telefone
              }

              const inseridos = await gravarNovos(telefoneNovo, 'telefones')
              
              break
            case 'enderecos':     
              let enderecoLista = {
                clienteId: id,
                endereco: lista[i].endereco,
                bairro: lista[i].bairro,
                numero: lista[i].numero,
                complemento: lista[i].complemento,
                cidade: lista[i].cidade,
                uf: lista[i].uf,
              }              
            gravarNovos(enderecoLista, 'enderecos')
        }
    }
  } 
}

atualizarTelefones = async (telefone, table) => {  
  const tabelaSelecionada = table === "enderecos" ? enderecos : telefones

  ver(209,{intencao: "FOI INSERIDO?", table: table, metodo: "atualizarTelefones"},telefone)
  const result = await tabelaSelecionada.upsert(telefone)
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

gravarNovos = async (informacoes, table) => {
  
  const tabelaSelecionada = table === "enderecos" ? enderecos : telefones
  const result = await tabelaSelecionada.create(informacoes)

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

ver =  (linha, table ,value) => {
console.log('.                                                                                           .')
  console.log('\x1b[36m%s\x1b[0m',`------- ${table.metodo} ${table.intencao} ------------------------------------------`)

   const cors =  [
    "\x1b[0m",
    "\x1b[1m",
    "\x1b[2m",
    "\x1b[4m",
    "\x1b[5m",
    "\x1b[7m",
    "\x1b[8m",
    "\x1b[30m",
    "\x1b[31m",
    "\x1b[32m",
    "\x1b[33m",
    "\x1b[34m",
    "\x1b[35m",
    "\x1b[36m",
    "\x1b[37m",
    "\x1b[40m",
    "\x1b[41m",
    "\x1b[42m",
    "\x1b[43m",
    "\x1b[44m",
    "\x1b[45m",
    "\x1b[46m",
    "\x1b[47m"
  ]
  const cor = Math.floor((Math.random() * 23) + 1)
  console.log( '\x1b[33m%s\x1b[0m', '====== MONITORANDO ======>',`linha(${linha}) -TABLE: ${table.table} - `, value)
  console.log('\x1b[36m%s\x1b[0m','----------------------------------------------------------------------------')

} 