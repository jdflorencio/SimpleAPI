const express = require('express')
const routes = express.Router()
//const verify = require('../../../Middlewares/auth_jwt')

const clienteController = require('../Controllers/ClienteController')
const clienteTelefoneController = require('../Controllers/ClienteTelefoneController')
//routes.use(verify)

routes.get('/', clienteController.index)
routes.get('/:idCliente', clienteController.cliente)
routes.post('/' ,clienteController.create)
routes.put('/', clienteController.update)
routes.delete('/:idCliente', clienteController.delete)

/* TELEFONES */
routes.get('/:idCliente/telefone', clienteTelefoneController.getAll)
routes.post('/:idCliente/add', clienteTelefoneController.addTelefone)
routes.put('/:idCliente/telefone', clienteTelefoneController.update)
routes.delete('/:idCliente/telefone/:idTelefone', clienteTelefoneController.delete)

/*
routes.get('/:idCliente/telefone/:idtelefone', clienteTelefoneController.index)
  routes.post('/:idCliente/telefone/')
  
  routes.delete('/:idCliente/telefone')
*/

module.exports = routes