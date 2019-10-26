// const { users } = require('../../../models')

exports.getAll = async (req) => {
	
	return 'estou no repository'
}

exports.login = async (req) => {

	if(req.body.user == 'diego' && req.body.pwd === '123') {
		// auth ok
		const id = 1 // essa ID vira do banco de dados
		var token = jwt.sign({ id }, process.env.SECRET, {
			expiresIn: 300 // in 5 min
		})
		.res.status(200).send({ auth: true, token: token})
	}
	return {
		status: 500,
		msg: "Login invalido!"
	}
}

exports.logout = async (req) => {
	return {
		status: 200,
		auth: false,
		token: null
	}
}

exports.update = async (req) => {
// 	const { body } = req
// 	if (body.id) {
// 		const foundUser = await users.findOne({ where: {
// 			id: body.id
// 		}})
// 		.then((result) =>{
// 			if (result == null) {
// 				return false
// 			} else {
// 				return true
// 			}
// 		})

// 		if (foundUser == false) {
// 			return "cliente não encontrado!"
// 		} else {
// 			const result = await users.upsert(body)
// 				.then((resp) => {
// 					if (resp == false) {
// 						return "User atualizado com sucesso!"
// 					}
// 				})
// 				.catch((error) => {
// 					console.log(error)
// 				})
// 				return result
// 		}
// 	} else {
//    return "cliente não encontrado!"
// 	}

	return 'usuario adicionado com sucesso!'
}

exports.deleting = async (req) => {
// 	const { idUser } = req.params
// 	const msg = await users.destroy({ where: {
//     id: idUser
//   }})
// 	.then((result) => { 
//     if (result == 0) {
//       return "User não encontrado"					
//     } else {
//       return "User Removido com sucesso"
//     }
//   })
//   .catch((error) => {
//     return error
//   })
  return 'usuario adicionando com sucesso'
}