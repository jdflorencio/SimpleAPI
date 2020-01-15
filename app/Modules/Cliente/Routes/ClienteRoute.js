const express = require('express')
const routes = express.Router()
//const verify = require('../../../Middlewares/auth_jwt')

const clienteController = require('../Controllers/ClienteController')
const clienteEnderecoController = require('../Controllers/ClienteEnderecoController')
const clienteTelefoneController = require('../Controllers/ClienteTelefoneController')
//routes.use(verify)

routes.get('/', clienteController.index)
routes.get('/:idCliente', clienteController.cliente)
routes.post('/' ,clienteController.create)
routes.put('/', clienteController.update)
routes.delete('/:idCliente', clienteController.delete)

// ENDEREÇOS
routes.get('/:idCliente/endereco/:idEndereco', clienteEnderecoController.enderecos)


module.exports = routes