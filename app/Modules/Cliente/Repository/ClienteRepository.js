const { clientes, enderecos , telefones, sequelize} = require('../../../models')
const tools = require('../../../Support/Tool')
const logger =  require('../../../utils/logger')
// const {parseISO, format, formatRelative, formatDistance}  = require('date-fns');
// const frenchLocale = require(‘date-fns/locale/fr’);

class ClienteRepository {

  async getAll(req){

    try {
      const allClientes = await clientes.findAll({attributes: [
        'id',
        'tipo',
        'nome',
        'nome_fantasia',
        [sequelize.fn('date_format', sequelize.col('createdAt'), '%d/%m/%Y'), 'createdAt'],
        [sequelize.fn('date_format' , sequelize.col('updatedAt'), '%d/%m/%Y às %H:%m:%s' ), 'updatedAt']
      ]})

      return allClientes
    }
    catch( error ) {
      this.retornoExecao( error )
    }
  }

  async getCliente(req){
    
    try {
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

    } catch(error) {
      this.retornoExecao( error )
    }
  }

  async getGerais(req) {

    try {

      const { idCliente } = req.params
      const cliente = await clientes.findOne({ where: { id: idCliente } })  
      return cliente

    } catch( error ) {
      
      this.retornoExecao( error )
    }
  }

  async addCliente(req){

    try {

      let transaction = await sequelize.transaction()
      const { body } = req
      const cliente = await clientes.create(body, {transaction: transaction})
      const { id } = cliente

      body.enderecos.map((endereco) => {
        if (endereco.updatedAt) {
            delete endereco.updatedAt

        } else if (endereco.createdAt) {
            delete endereco.createdAt
        }

        endereco.clienteId = id
      })

      body.telefones.map((telefone) => {
        if (telefone.updatedAt) {
          delete telefone.updatedAt

      } else if (telefone.createdAt) {
          delete telefone.createdAt
      }

        telefone.clienteId = id
      })

      await telefones.bulkCreate(body.telefones, {transaction: transaction})
      await enderecos.bulkCreate(body.enderecos, {transaction: transaction})
      await transaction.commit();

      return {status: 200, msg: "Adicionando com Sucesso!", id: id}
    
    } catch (error) {
      await transaction.rollback()
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
          if (endereco.updatedAt) {
            delete endereco.updatedAt

          } else if (endereco.createdAt) {
            delete endereco.createdAt
          }
          
          if (endereco.clienteId === undefined) {
            endereco.clienteId = body.id
          }
        })
        
        body.telefones.map( telefone => {
          if (telefone.updatedAt) {
            delete telefone.updatedAt

          } else if (telefone.createdAt) {
            delete telefone.createdAt
          }
          
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
      await transaction.rollback()
      return this.retornoExecao(error)      
    }
  }

  async deleting(req) {
    
    try{
      let transaction = await sequelize.transaction()
      const { idCliente } = req.params      
      const msg = await clientes.destroy({ where: {id: idCliente}}, {transaction: transaction})

    } catch ( error ) {
      await transaction.rollback()
      return this.retornoExecao( error )
    }
  }

  retornoExecao(erro) {    
    try {
      
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