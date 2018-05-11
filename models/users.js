const {Datatypes} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
	const User = sequelize.define("users", {
		googleId: {
    		type: Datatypes.STRING
  		},
  		// username: {
  		// 	type: Datatypes.STRING,
  		// 	unique: true;
  		// },
  		// email: {
  		// 	type: Datatypes.STRING,
  		// 	unique: true,
  		// },
  		// password: Datatypes.STRING,
	});

	// User.associate = (models) => {
	// 	User.belongToMany(models.Team, {
	// 		through: 'member',
	// 		foreignKey: 'userId',
	// 	});
	// };
 
	return User;
};
