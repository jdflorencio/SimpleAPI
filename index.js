const express = require('express');
const app = express();
// require('dotenv').config();
// const cors = require('cors')
const routes = require('./app/Modules/Cliente/Routes/ClienteRoute');
const server = require('http').Server(app);
    
// console.log(process.env.DB_HOST)
//ROUTES 
app.use('/cliente', routes);
server.listen(3333);
