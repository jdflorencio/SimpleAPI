const { clientes } = require('../../../models')
exports.getAll = async (req, res) => {
	const allClientes = await clientes.findAll({attributes: [
		'id',
		'tipo',
		'nome',
		'nome_fantasia',
		// infor pessoas
		'data_nascimento',
		'data_fundacao',
		'nacionalidade',
		'estado_civil',
		'rg',
		'cpf_cnpj',
		'inscricao_estadual',
		// endereço
		'endereco',
		'bairro',
		'numero',
		'complemento',
		'cidade',
		'uf',
		//  contato
		'email',
		'telefone',
		'celular',
		'createdAt',
		'updateAt',]});
	return allClientes;
}

exports.deleting = async (req) => {
	const { idCliente } = req.params
	const msg = await clientes.destroy({ where: {
			id: idCliente
		}})
		.then((u) => { 
			if (u == 0) {
				return "Cliente não encontrado"					
			} else {
				return "Cliente Removido com sucesso"
			}
		})
		return msg
}
