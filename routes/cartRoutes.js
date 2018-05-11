const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	//SAVE SESSION CART API
	app.post('/api/cart', requireLogin, (req,res) => {
		const cart = req.body;
		req.session.cart = cart;
		req.session.save((err) => {
			if(err) {
				console.log("# API GET CART: ", err);
			}
			res.json(req.session.cart);
		})
	});

	//GET SESSION CART API
	app.get('/api/cart', requireLogin, (req, res) => {
		if(typeof req.session.cart !== 'undefined'){
			res.json(req.session.cart);
		}
	});
};