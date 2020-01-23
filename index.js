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

/* CONFIG */
app.use(cors())

// parse application/json
app.use(bodyParser.json())
    
// console.log(process.env.DB_HOST)


app.use('/cliente', routesClientes)
app.use('/produto', routesProdutos)
app.use('/auth', routesUser)

// PARA ROTAS NÃO EXISTENTE
app.use((req, res, next) => {
  const erro = new Error('Não encontrado')  
  erro.status = 404
  next(erro)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.send({
    erro: {
      msg: error.message
    }
  })
})

server.listen(3333);
