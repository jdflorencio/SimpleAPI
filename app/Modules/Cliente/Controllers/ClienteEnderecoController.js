const repository = require('../Repository/ClienteEnderecoRepository');

module.exports = {

  async index(req, res) {
    const enderecos =  await repository.getAll(req);
    return res.send(enderecos);
  },

  async getOne(req, res) {
    const endereco =  await repository.getEndereco(req);
    return res.send(endereco);
  },

  async create(req, res) {
    const endereco =  await repository.addEndereco(req);
    return res.status(endereco.status).send(endereco);
  },

  async update(req, res) {
    const endereco =  await repository.update(req);
    return res.status(endereco.status).send(endereco);
  },

  async delete(req, res) {
    const endereco =  await repository.deleting(req);   
    return res.status(endereco.status).send(endereco);
  }
}