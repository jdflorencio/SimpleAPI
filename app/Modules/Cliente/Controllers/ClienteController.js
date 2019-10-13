const repository = require('../Repository/ClienteRepository');

module.exports = {
    async index(req, rest) {
       const clientes =  await repository.getAll(req, rest);
       return rest.send(clientes);
    },

    async create(req, rest) {
        // const clientes =  await repository.getAll(req, rest);
        return rest.send('em desenvolvimento o metodo create');
     },


    async update(req, rest) {
        // const clientes =  await repository.getAll(req, rest);
        return rest.send('em desenvolvimento');
     },

     async delete(req, rest) {
        // const clientes =  await repository.getAll(req, rest);
        return rest.send('em desenvolvimento');
     },
}