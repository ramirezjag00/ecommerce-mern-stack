//dev.js - don't commit this
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bazaar','postgres','postgres', {
	dialect: 'postgres',
});

module.exports = {
	googleClientID: "422769475641-9ag65aoq2u38s49ri4lnlco2nb3i8i2j.apps.googleusercontent.com",
	googleClientSecret: "chhrgW1d5GQBd6ea-ZQcTZ4K",
	cookieKey: 'pkpkshrtsprsgfngtmbynmtb',
	databaseURL:  sequelize,
};