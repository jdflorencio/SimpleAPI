const repository = require('../Repository/ProdutoRepository')

module.exports = {
  async index(req, res) {
    const produtos = await repository.getAll(req);
    return res.send(produtos);
  }
}