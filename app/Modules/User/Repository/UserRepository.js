const { users } = require('../../../models/')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

exports.getAll = async (req) => {	
	return 'estou no repository'
}

exports.login = async (req) => {
	
	const {email, password, userId } = req.body
	const user = await users.findOne(
		{where: {
			email: email
		}})

	if (!user) {
		return {
			status: 401,
			msg: "usuario não encontrado!"
		}
	}
	
	const authenticated = bcrypt.compare(password, user.password)
	.then(( result) => {		
		
		if (result) {	
			const id = user.id // essa ID vira do banco de dados
			var token = jwt.sign({ id }, process.env.SECRET, {
				expiresIn: 100 // in 5 min
			})

			return {
				status: 200,
				msg: token 
			}

		} else {
			return {
				status: 401,
				msg: 'Login Invalido'
			}
		}
	}).catch((err) => {
		return {
			status: 400,
			msg: err
		}
	})

	return authenticated
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