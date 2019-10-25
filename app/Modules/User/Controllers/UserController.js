const repository = require('../Repository/UserRepository');

module.exports = {
  async index(req, res) {
    const users =  await repository.getAll(req);
    return res.send(users);
  },

  async cliente(req, res) {
    const users =  await repository.getUser(req);
    return res.send(users);
  },

  async create(req, res) {
    const users =  await repository.addUser(req);
    return res.send(users);
  },

  async update(req, res) {
    const users =  await repository.update(req);
    return res.send(users);
  },

  async delete(req, res) {
    const cliente =  await repository.deleting(req);   
    return res.send(cliente);
  }
}