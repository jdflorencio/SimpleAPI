const repository = require('../Repository/ClienteRepository');



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
    const cliente =  await repository.update(req);
    return res.status(cliente.status).send(cliente);
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