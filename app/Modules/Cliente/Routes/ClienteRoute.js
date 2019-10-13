const express = require('express');
const routes = express.Router();
const clienteController = require('../Controllers/ClienteController');

routes.get('/', clienteController.index);


module.exports = routes;