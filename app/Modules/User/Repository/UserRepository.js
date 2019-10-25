// const { users } = require('../../../models')

exports.getAll = async (req) => {
	
	return 'estou no repository'
}

exports.getUser = async (req) => {
// 	const { idUser } = req.params
// 	const cliente = await users.findOne({ where: {
//     id: idUser
//   }})
//   return cliente
	return 'retorna usuario'
}

exports.addUser = async (req) => {
	// const { body } = req		
	// const result = await users.create(body)
	// 	.then((resp) => {
	// 		if (resp != null) {
	// 			return { 
	// 				id: resp.null,
	// 				msg : "User cadastrado com sucesso!" 
	// 			}
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})
	return 'usuario adicionando com sucesso'
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