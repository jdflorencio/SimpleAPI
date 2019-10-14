const repository = require('../Repository/ClienteRepository');

module.exports = {
    async index(req, res) {
       const clientes =  await repository.getAll(req);
       return res.send(clientes);
    },

    async cliente(req, res) {
      const clientes =  await repository.getCliente(req);
      return res.send(clientes);
   },

    async create(req, res) {
        const clientes =  await repository.addCliente(req);
        return res.send(clientes);
     },

    async update(req, res) {
        const clientes =  await repository.update(req);
        return res.send(clientes);
     },

     async delete(req, res) {
      const cliente =  await repository.deleting(req);   
      return res.send(cliente);
   }
}