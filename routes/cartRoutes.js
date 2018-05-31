const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const requireLogin = require('../middlewares/requireLogin');

const Checkouts = mongoose.model('checkouts');

module.exports = (app) => {
  // SAVE SESSION CART API
  app.post('/api/cart', requireLogin, (req, res) => {
    const cart = req.body;
    const totals = (cart) => {
      const totalAmount = cart.map(cartArr => (
        cartArr.price * cartArr.quantity
      )).reduce((a, b) => (
        a + b
      ), 0); // start summing from index0
      return { amount: totalAmount * 100 };
    };
    const totalAmount = totals(cart).amount;
    req.session.cart = cart;
    req.session.totalAmount = totalAmount;
    req.session.save((err) => {
      if (err) {
        console.log('# API GET CART: ', err);
      }
      res.json(req.session.cart);
    });
  });

  // GET SESSION CART API
  app.get('/api/cart', requireLogin, (req, res) => {
    if (typeof req.session.cart !== 'undefined') {
      res.json(req.session.cart);
    // This actually destroys the session
    // delete req.session;
    }
  });

  // SAVE SESSION CART to CHECKOUTS SCHEMA API
  app.post('/api/checkouts', requireLogin, (req, res) => {
    const cart = [];
    for (let i = 0; i < req.session.cart.length; i++) {
      cart.push({
        title: req.session.cart[i].title,
        description: req.session.cart[i].description,
        images: req.session.cart[i].images,
        price: req.session.cart[i].price,
        quantity: req.session.cart[i].quantity,
      });
    }
    const user = req.user._id;
    const { totalAmount } = req.session;
    const newCheckout = { cart, user, totalAmount };
    Checkouts.create(newCheckout, (err, checkouts) => {
      if (err) {
        throw err;
      }
      res.json(checkouts);
    });
  });
};
