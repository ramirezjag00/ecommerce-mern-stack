const express = require("express");
const app = express();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const models = require('./models');

require("./services/passport");
// const Sequelize = require('sequelize');
// const sequelize = keys.DATABASE_URL;

app.use(bodyParser.json());

app.use(
	cookieSession({
		//how long can a cookie exist on the browser before it is automatically expires
		//30 days in ms
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());
//require the ROUTES function/s and immediately calls that function
//this is a valid js syntax
require("./routes/authRoutes")(app);
require("./routes/itemRoutes")(app);

//route handling for production only. there are some routes that can be handled by express server, some can be answered by the css/js files from the build and some routes that can only be resolved by index.html
if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets
	//like our main.js file, main.css file!
	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//create database models in psql using sequelize once the server has started running
// will drop any existing tables with the same name and redo it
models.sequelize.sync({force: true}).then(() => {
// models.sequelize.sync().then(() => {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, process.env.IP, () => {
		console.log("BAZAAR SERVER STARTED");
	});
});


