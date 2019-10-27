const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// require('dotenv').config();
var jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('./app/Modules/Cliente/Routes/ClienteRoute');
const routesUser = require('./app/Modules/User/Routes/UserRoute');
const server = require('http').Server(app);

/* CONFIG */
app.use(cors())

// parse application/json
app.use(bodyParser.json())
    
// console.log(process.env.DB_HOST)
//ROUTES 
app.use('/cliente', routes);
// authentication 
app.use('/auth', routesUser)


server.listen(3333);
