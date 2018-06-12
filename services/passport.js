const passport = require('passport');
// google oauth with Strategy property
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  // coming back from google, handle this route and back to our app
  callbackURL: '/auth/google/callback',
  // to use dev or prod callback URI
  proxy: true,
  // used async code and handled promises with await lastly, deleted .then functions
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  // to get profile details
  // console.log('currentUser', profile)
  if (existingUser) {
  // we already have a record with the given profile ID
    return done(null, existingUser);
  } // no need for else statement as we already used return in the if statement
  // we don't have a user record with this ID, make a new record
  const user = await new User({
    googleId: profile.id, googleFname: profile.name.givenName, googleLname: profile.name.familyName, googleEmail: profile.emails[0].value,
  }).save();
  done(null, user);
}));
