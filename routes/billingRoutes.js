const keys = require('../config/keys');
//read https://stripe.com/docs/api/node#create_charge
//npm i -S stripe
//this will handle the tokens that we receive from the front end when user submits form for having credits
//this requires a second parameter stripeSecretKey
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	//use middleware requireLogin as 2nd argument
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//for creating charge
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'php',
			description: 'Happy shopping!',
			source: req.body.id
		});
		//console.log(charge);
		// //instead of having a callback, we can have an async await syntax
		// //to make sure that we get the latest user model, we use const user to have reference, with async await syntax
		// req.user.credits += 5;
		// const user = await req.user.save();

		// res.send(user);
	});
};