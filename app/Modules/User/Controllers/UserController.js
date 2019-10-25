const repository = require('../Repository/UserRepository');

module.exports = {
  async index(req, res) {
    const users =  await repository.getAll(req);
    return res.send(users);
  },

  async user(req, res) {
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
    const user =  await repository.deleting(req);   
    return res.send(user);
  }
}