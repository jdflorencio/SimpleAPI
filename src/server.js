const express = require('express');
const app = express();
// const cors = require('cors')
const routes = require('./Modules/Cliente/Routes/ClienteRoute');
const server = require('http').Server(app);


//ROUTES 
app.use('/cliente', routes);
server.listen(3333);
