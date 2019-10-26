const express = require('express');
const routes = express.Router();

const userController = require('../Controllers/UserController');

routes.get('/login', userController.login);

routes.get('/logout', userController.logout);
routes.post('/' ,userController.create);
routes.put('/', userController.update);
routes.delete('/:idUser', userController.delete);

module.exports = routes;