const express = require('express');
const routes = express.Router();

const clienteController = require('../Controllers/ClienteController');

routes.get('/', clienteController.index);
routes.get('/:idCliente', clienteController.cliente);
routes.post('/' ,clienteController.create);
routes.put('/', clienteController.update);
routes.delete('/:idCliente', clienteController.delete);

module.exports = routes;