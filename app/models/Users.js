module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	})
	return Users
}