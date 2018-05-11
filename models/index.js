//require sequelize
const Sequelize = require('sequelize');

//sequelize instance which will connect to postgresql db
//config.dbname, config.username, config.password
const keys = require("../config/keys"); 
const sequelize = keys.databaseURL;
// const sequelize = new Sequelize('bazaar','postgres','postgres', {
// 	dialect: 'postgres',
// });
// postgres://postgres:postgres@localhost:5432/bazaar
const models = {
	User: sequelize.import('./users'),
	Item: sequelize.import('./items'),
	//put models here
	// Team: sequelize.import('./team'),
	// Channel: sequelize.import('./channel'),
	// Message: sequelize.import('./message'),
	
};

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;