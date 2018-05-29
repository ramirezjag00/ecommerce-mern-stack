const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const keys = require('../config/keys');
// read https://stripe.com/docs/api/node#create_charge
// npm i -S stripe
// this will handle the tokens that we receive from the front end when user submits form for having credits
// this requires a second parameter stripeSecretKey
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  // use middleware requireLogin as 2nd argument
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const amount = req.session.totalAmount;
    // console.log(amount);
    // for creating charge
    const charge = await stripe.charges.create(
      {
        amount,
        currency: 'php',
        description: 'Happy shopping!',
        source: req.body.id,
      });
    res.send(req.user);
  });
};
