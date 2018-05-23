const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Checkouts = mongoose.model('checkouts');

module.exports = app => {
	//SAVE SESSION CART API
	app.post('/api/cart', requireLogin, (req,res) => {
		// console.log('body',req.body);
		// console.log('user', req.user);
		const cart = req.body;
		const user = req.user._id;
		// const newSession = {cart, user};
		// console.log('newsession',newSession);
		// req.session.cart = newSession;
		req.session.cart = cart;
		// console.log('cart',req.session.cart);
		// console.log('user', req.session.cart.user);
		req.session.save((err) => {
			if(err) {
				console.log("# API GET CART: ", err);
			}
			res.json(req.session.cart);
		});
	});

	//GET SESSION CART API
	app.get('/api/cart', requireLogin, (req, res) => {
		if(typeof req.session.cart !== 'undefined'){
			// console.log('CART',req.session.cart);
			// console.log('USER',req.session.passport.user);
			// if(req.user._id === req.session.cart.user) { 
				res.json(req.session.cart);
				// This actually destroys the session
        		delete req.session;
			// } else {
				// console.log('');
			// }
		}
	});

	//SAVE SESSION CART to CHECKOUTS SCHEMA API
	app.post('/api/checkouts', requireLogin, (req,res) => {
		// console.log('CARTyyy',req.session.cart);
		// console.log('USERyyy',req.session.passport.user);
		const cart = []

		for ( var i = 0; i < req.session.cart.length; i++ ) {
				cart.push({
				title: req.session.cart[i].title,
				description: req.session.cart[i].description,
				images: req.session.cart[i].images,
				price: req.session.cart[i].price,
				quantity: req.session.cart[i].quantity
				});
		}
		const user = req.user._id;

		const newCheckout = {cart, user};

		Checkouts.create(newCheckout, (err, checkouts) =>{
			if (err) {
				throw err;
			}
			// console.log('CARTxxx',req.session.cart);
			// console.log('USERxxx',req.session.passport.user);
			res.json(checkouts);
		});
	});
};