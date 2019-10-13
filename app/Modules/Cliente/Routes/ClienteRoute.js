const express = require('express');
const routes = express.Router();
const clienteController = require('../Controllers/ClienteController');

routes.get('/', clienteController.index);
routes.post('/', clienteController.create);
routes.put('/', clienteController.update);
routes.get('/', clienteController.delete);


module.exports = routes;