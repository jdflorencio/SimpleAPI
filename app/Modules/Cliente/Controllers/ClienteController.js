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
        // const clientes =  await repository.getAll(req, res);
        return res.send('em desenvolvimento o metodo create');
     },

    async update(req, res) {
        // const clientes =  await repository.getAll(req, res);
        return res.send('em desenvolvimento');
     },

     async delete(req, res) {
      const cliente =  await repository.deleting(req);   
      return res.send(cliente);
   }
}