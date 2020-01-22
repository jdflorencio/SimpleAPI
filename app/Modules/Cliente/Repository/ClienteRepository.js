const { clientes, enderecos , telefones} = require('../../../models')
const tools = require('../../../Support/Tool')
const logger =  require('../../../utils/logger')

class ClienteRepository {

  async getAll(req){
    
    try {
      const allClientes = await clientes.findAll({attributes: [
        'id',
        'tipo',
        'nome',
        'nome_fantasia',
        'createdAt',	
        'updatedAt',]})
      return allClientes
    }
    catch( error ) {
      logger.verbose(error)
    }
  }

  async getCliente(req){
    const { idCliente } = req.params
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

  async getGerais(req) {
    const { idCliente } = req.params
    const cliente = await clientes.findOne({ 
      where: { id: idCliente }
    })

    return cliente
  }

  async addCliente(req){
    try {
      const { body } = req
      const result = await clientes.create(body)
      .then((resp) =>{
        if (resp != null) {
          return {
            status: 201,
            id: resp.null,
            msg : "Cliente cadastrado com sucesso!" 
          }
        }
      })
    } catch (error) {
      logger.error( error )
    }
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

      body.id = result.id
      let informacoes_telefones = await consultarItensTableFilho(body, 'telefones')
      let informacoes_enderecos = await consultarItensTableFilho(body, 'enderecos')
    return result
  }

  async update(req){    
    const { body } = req    
    if (body.id) {      
      const foundCliente = await clientes.findOne({ where: {
        id: body.id
      }})
      .then((result) => {
        if (result == null) {
          return false
        } else {
          return true
        }
      })
      switch ( foundCliente ) {
        case false:
          break
        case true:
          let informacao_gerais = await salvarGeral(body)
          switch(informacao_gerais.status) {
            case true:
              let informacoes_telefones = await consultarItensTableFilho(body, 'telefones')
              let informacoes_enderecos = await consultarItensTableFilho(body, 'enderecos')    
              break    
          }
        }
    }
  }

  async salvarGeral(informacoes_gerais){
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

  async consultarItensTableFilho(cliente, table){
    const { id } = cliente
    let lista = table === "enderecos" ? cliente.enderecos : cliente.telefones
    let tabelaSelecionada = table === "enderecos" ? enderecos : telefones  

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
              break
            case false:
              console.log('telefone não foi encontrado para ser atualizado')
              break         
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
        case false:
          console.log('não vou add')
        break
      }
    }
}

  async atualizarTelefones(telefone, table){  
    const tabelaSelecionada = table === "enderecos" ? enderecos : telefones
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

  async gravarNovos(informacoes, table){
  
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
    .catch((error) =>{
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

  async deleting(req){
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

  }
}

let cliente = new ClienteRepository()

module.exports = cliente





