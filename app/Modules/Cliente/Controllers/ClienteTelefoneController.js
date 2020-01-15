const repository = require('../Repository/ClienteTelefoneRepository');

module.exports = {
  async index(req, res) {
    const telefones =  await repository.getAll(req);
    return res.send(telefones);
  },

  async getOne(req, res) {
    const telefone =  await repository.getTelefone(req);
    return res.send(telefone);
  },

  async create(req, res) {
    const telefone =  await repository.addTelefone(req);
    return res.status(telefone.status).send(telefone);
  },

  async update(req, res) {
    const telefone =  await repository.update(req);
    return res.status(telefone.status).send(telefone);
  },

  async delete(req, res) {
    const telefone =  await repository.deleting(req);   
    return res.status(telefone.status).send(telefone);
  }
}