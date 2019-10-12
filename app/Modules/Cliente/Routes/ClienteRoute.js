const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('estou na tela principal de clientes');
});


module.exports = routes;