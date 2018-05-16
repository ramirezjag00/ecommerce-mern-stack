const passport = require("passport");

module.exports = app => {
	//when user comes from auth/google, handle passport authentication with google which is actually the GoogleStrategy
	//scope asks google what access we want to have: profile and email
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));
	//passport.authenticate is a middleware, a function which authenticates the user, and fetches user profile and details using google strategy
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/items');
		}
	);

	app.get('/api/logout', (req,res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
