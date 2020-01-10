const repository = require('../Repository/ClienteTelefoneRepository');

module.exports = {
  async getAll(req, res) {
    const telefones =  await repository.getTelefone(req)
    return res.send(telefones)
  },

  async addTelefone(req, res) {
    const telefones =  await repository.addTelefone(req);
    return res.status(telefones.status).send(telefones);
  },

  async update(req, res) {    
    const telefones =  await repository.update(req);
    return res.status(telefones.status).send(telefones);
  },

  async delete(req, res) {    
    const telefones =  await repository.deleting(req);
    return res.status(telefones.status).send(telefones);
  }
}