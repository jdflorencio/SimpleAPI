const { clientes, enderecos , telefones, sequelize} = require('../../../models')
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
          model: telefones,
          attributes: {
            exclude: ['id']
          }     
        },
        {
          model: enderecos,
          attributes: {
            exclude: ['id']
          }     
        },
        
      ],
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
      
      let transaction = await sequelize.transaction();
      const { body } = req
      const cliente = await clientes.create(body, {transaction: transaction})
      const { id } = cliente

      body.enderecos.map((endereco) => {
        endereco.clienteId = id
      })

      body.telefones.map((telefone) => {
        telefone.clienteId = id        
      })

      await telefones.bulkCreate(body.telefones, {transaction: transaction})
      await enderecos.bulkCreate(body.enderecos, {transaction: transaction})
      await transaction.commit();

      return {status: 200, msg: "Adicionando com Sucesso!"}
    
    } catch (error) {
      return this.retornoExecao(error)      
    }
  }

  async update(req) {
    
    try{
      const { body } = req
      
      let transaction = await sequelize.transaction()
      if ( body.id) {
    
        const foundCliente = await clientes.findOne({ where: {id: body.id }})
        await foundCliente.update(body, {transaction: transaction} )
        await enderecos.destroy({where: {clienteId: body.id}}, {transaction: transaction})
        await telefones.destroy({where: {clienteId: body.id}}, {transaction: transaction})

        body.enderecos.map( endereco => {
          if (endereco.clienteId === undefined) {
            endereco.clienteId = body.id
          }
        })
        
        body.telefones.map( telefone => {
          if (telefone.clienteId === undefined) {
            telefone.clienteId = body.id
          }
        })

        await enderecos.bulkCreate(body.enderecos, {transaction: transaction})
        await telefones.bulkCreate(body.telefones, {transaction: transaction})
        
        await transaction.commit();
        return {status: 200, msg: "Atualizado com sucesso!"}
      }      
    } catch ( error ) {
      return this.retornoExecao(error)      
    }    
  }

  async deleting(req){
    try{

      const { idCliente } = req.params      
      const msg = await clientes.destroy({ where: {id: idCliente}})

    } catch ( error ) {
       return this.retornoExecao( error )
    }
  }

  retornoExecao(erro) {
    
    try {
      
      const {errors} = erro
      logger.error(errors)
      let fieldMsg = []

      errors.map( (er ) => {
        fieldMsg.push({
          fiel: er.path,
          msg: er.message
        })
      })

      return  { status:401, errors:fieldMsg  }

    } catch (error) {
      return {status: 500, msg: error }      
    }
  }

}

let cliente = new ClienteRepository()
module.exports = cliente