const express = require('express')
const routes = express.Router()
//const verify = require('../../../Middlewares/auth_jwt')

const clienteController = require('../Controllers/ClienteController')
//routes.use(verify)

routes.get('/', clienteController.index)
routes.get('/:idCliente', clienteController.cliente)
routes.post('/' ,clienteController.create)
routes.put('/', clienteController.update)
routes.delete('/:idCliente', clienteController.delete)

module.exports = routes