const repository = require('../Repository/ClienteTelefoneRepository');

module.exports = {
  async getAll(req, res) {
    const telefones =  await repository.getTelefone(req)
    console.log('telefones')
    return res.send(telefones)
  }
}