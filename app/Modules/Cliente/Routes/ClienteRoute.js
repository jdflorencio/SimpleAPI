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
routes.get('/:idCliente/telefone', clienteTelefoneController.getall)
routes.get('/:idCliente/telefone/:idtelefone', clienteTelefoneController.index)


routes.post('/:idCliente/telefone/')
routes.put('/:idCliente/telefone')
routes.delete('/:idCliente/telefone')

module.exports = routes