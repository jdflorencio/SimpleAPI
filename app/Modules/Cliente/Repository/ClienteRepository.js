const { clientes } = require('../../../models')
exports.getAll = async (req) => {
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
		'updatedAt',]});
	return allClientes;
}

exports.getCliente = async (req) => {
	const { idCliente } = req.params
	const cliente = await clientes.findOne({ where: {
			id: idCliente
		}})
		return cliente
}

exports.addCliente = async (req) => {
	const { body } = req		
	const result = await clientes.create(body)
		.then((resp) => {
			if (resp != null) {
				return { 
					id: resp.null,
					msg : "Cliente cadastrado com sucesso!" 
				}
			}
		})
		.catch((error) => {
			console.log(error)
		})
	return result
}

exports.update = async (req) => {
	const { body } = req
	if (body.id) {
		const foundCliente = await clientes.findOne({ where: {
			id: body.id
		}})
		.then((result) =>{
			if (result == null) {
				return false
			} else {
				return true
			}
		})

		if (foundCliente == false) {
			return "cliente não encontrado!"
		} else {
			const result = await clientes.upsert(body)
				.then((resp) => {
					if (resp == false) {
						return "Cliente atualizado com sucesso!"
					}
				})
				.catch((error) => {
					console.log(error)
				})
				return result
		}
	} else {
		return "cliente não encontrado!"
	}	
}

exports.deleting = async (req) => {
	const { idCliente } = req.params
	const msg = await clientes.destroy({ where: {
			id: idCliente
		}})
		.then((result) => { 
			if (result == 0) {
				return "Cliente não encontrado"					
			} else {
				return "Cliente Removido com sucesso"
			}
		})
		.catch((error) => {
			return error
		})
		return msg
}