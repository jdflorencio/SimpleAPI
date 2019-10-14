const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// require('dotenv').config();
// const cors = require('cors')
const routes = require('./app/Modules/Cliente/Routes/ClienteRoute');
const server = require('http').Server(app);

/* CONFIG */

// parse application/json
app.use(bodyParser.json())
    
// console.log(process.env.DB_HOST)
//ROUTES 
app.use('/cliente', routes);
server.listen(3333);
