const passport = require("passport");

module.exports = app => {
	//when user comes from auth/google, handle passport authentication with google which is actually the GoogleStrategy
	//scope asks google what access we want to have: profile and email
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email'],
		//ask user to log in with a diff account
		//prevent auto-login with previous user
		//https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
		//[ISSUE]using google auth20 shows clientID when logging in google account
		//[SOLVED] http://www.ietf.org/mail-archive/web/oauth/current/msg08181.html
		prompt: 'select_account'
	}));
	//passport.authenticate is a middleware, a function which authenticates the user, and fetches user profile and details using google strategy
	app.get(
		'/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/auth/google' }),
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
