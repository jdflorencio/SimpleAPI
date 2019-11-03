const repository = require('../Repository/UserRepository');

module.exports = {
  async login(req, res, next) {
    
    const  {status, msg} =  await repository.login(req);
    return res.status(status).send(msg);
  },

  async logout(req, res) {  
    const users =  await repository.logout(req);
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