/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userFirstName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		userLastName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		userEmail: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		userPassword: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'User',
		timestamps: false
	});
};
