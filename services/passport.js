const passport = require("passport");
//google oauth with Strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const Sequelize = require('sequelize');
const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
const keys = require("../config/keys"); 
const sequelize = keys.databaseURL;
// const sequelize = keys.DATABASE_URL;

const User = require('../models/users')(sequelize, DataTypes);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(new GoogleStrategy({
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			//coming back from google, handle this route and back to our app
			callbackURL: "/auth/google/callback",
			//to use dev or prod callback URI
			proxy: true
			//used async code and handled promises with await lastly, deleted .then functions
			}, async (accessToken, refreshToken, profile, done) => {
				const existingUser = await User.findOne({ googleId: profile.id })

				if(existingUser) {
					//we already have a record with the given profile ID
					return done(null, existingUser);
				} //no need for else statement as we already used return in the if statement
					//we don't have a user record with this ID, make a new record
					const user = await new User({ googleId: profile.id }).save();
					done(null, user);
}));