const express = require('express')
const routes = express.Router()
//const verify = require('../../../Middlewares/auth_jwt')

const clienteController = require('../Controllers/ClienteController')
const clienteEnderecoController = require('../Controllers/ClienteEnderecoController')
const clienteTelefoneController = require('../Controllers/ClienteTelefoneController')
//routes.use(verify)

// CLIENTES
routes.get('/', clienteController.index)
// routes.get('/:idCliente/all', clienteController.cliente)
routes.get('/:idCliente', clienteController.cliente)
routes.post('/' ,clienteController.create)
routes.put('/', clienteController.update)
routes.delete('/:idCliente', clienteController.delete)

// ENDEREÇOS
routes.get('/:idCliente/endereco/', clienteEnderecoController.index)
routes.get('/:idCliente/endereco/:idEndereco', clienteEnderecoController.getOne)
routes.post('/:idCliente/endereco/', clienteEnderecoController.create)
routes.post('/:idCliente/endereco/:idEndereco', clienteEnderecoController.update)
routes.delete('/:idCliente/endereco/:idEndereco', clienteEnderecoController.delete)

// TELEFONES
routes.get('/:idCliente/telefone/', clienteTelefoneController.index)
routes.get('/:idCliente/telefone/:idTelefone', clienteTelefoneController.getOne)
routes.post('/:idCliente/telefone/', clienteTelefoneController.create)
routes.post('/:idCliente/telefone/:idTelefone', clienteTelefoneController.update)
routes.delete('/:idCliente/telefone/:idTelefone', clienteTelefoneController.delete)

routes.get('/:idCliente/telefonetipo', clienteTelefoneController.tiposTelefone)


module.exports = routes