const express = require('express');
const logger =  require('./app/utils/logger')
const bodyParser = require('body-parser');
const app = express();
// require('dotenv').config();
var jwt = require('jsonwebtoken');
const cors = require('cors');
const routesClientes = require('./app/Modules/Cliente/Routes/ClienteRoute');
const routesProdutos = require('./app/Modules/Produto/Routes/ProdutoRoute');
const routesUser = require('./app/Modules/User/Routes/UserRoute');
const server = require('http').Server(app);

logger.error('testando novo log')

/* CONFIG */
app.use(cors())

// parse application/json
app.use(bodyParser.json())
    
// console.log(process.env.DB_HOST)
//ROUTES 
app.use('/cliente', routesClientes);
//ROUTES 
app.use('/produto', routesProdutos);
// authentication   
app.use('/auth', routesUser)

server.listen(3333);
