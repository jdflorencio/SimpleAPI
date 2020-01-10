const express = require('express')
const routes = express.Router()

const produtoController = require('../Controllers/ProdutoController')

routes.get('/', produtoController.index)

module.exports = routes;