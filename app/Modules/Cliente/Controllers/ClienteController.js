// const Dev = require('../models/Devs');

module.exports = {
    async index(req, rest) {
        return rest.send('estou no model cliente');
    }
}