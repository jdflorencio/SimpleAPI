const repository = require('../Repository/ClienteRepository')
const validar = require('../Validate/ClienteValidate')
const logger =  require('../../../utils/logger')



module.exports = {
  async index(req, res) {
    const ClienteRepository = repository
    const clientes =  await repository.getAll(req);
    return res.send(clientes);
  },

  async cliente(req, res) {
    const clientes =  await repository.getCliente(req);
    return res.send(clientes);
  },
  
  async getGerais(req, res) {
    const clientes =  await repository.getGerais(req);
    return res.send(clientes);
  },

  async create(req, res) {
    const cliente =  await repository.addCliente(req);
    return res.status(cliente.status).send(cliente);
  },

  async update(req, res) {
    const validos = validar.object(req.body)
    if (!validos) {
      const cliente =  await repository.update(req);
      return res.status(cliente.status).send(cliente);
    }
    return res.status(validos.status).send(validos);
  },

  async delete(req, res) {
    const cliente =  await repository.deleting(req);   
    return res.status(cliente.status).send(cliente);
  },

  async uf(req, res) {
    const ufs =  await repository.ufList(req);   
    return res.status(ufs.status).send(ufs);
  }
}