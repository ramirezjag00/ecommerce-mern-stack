const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const requireLogin = require('../middlewares/requireLogin');

const Checkouts = mongoose.model('checkouts');

module.exports = (app) => {
  // SAVE SESSION CART API
  app.post('/api/cart', requireLogin, (req, res) => {
  // console.log('body',req.body);
  // console.log('user', req.user);
  // console.log(req.body)
    const cart = req.body;
    const totals = (cart) => {
      const totalAmount = cart.map(cartArr => (
        cartArr.price * cartArr.quantity
      )).reduce((a, b) => (
        a + b
      ), 0); // start summing from index0
      return { amount: totalAmount*100 };
    };
    const totalAmount = totals(cart).amount;
    // const newSession = { cart, totalAmount };
    // console.log('newsession', newSession);
    req.session.cart = cart;
    req.session.totalAmount = totalAmount;
    // req.session.cart = cart;
    // console.log(req.session.cart);
    // console.log(cart);
    // console.log('session', req.session);
    // console.log('cart', req.session.cart);
    // console.log('totalAmount', req.session.cart.totalAmount);
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
    // console.log('CART',req.session.cart);
    // console.log('USER',req.session.passport.user);
    // if(req.user._id === req.session.cart.user) {
      res.json(req.session.cart);
    // This actually destroys the session
    // delete req.session;
    // } else {
    // console.log('');
    // }
    }
  });

  // SAVE SESSION CART to CHECKOUTS SCHEMA API
  app.post('/api/checkouts', requireLogin, (req, res) => {
    // console.log('CARTyyy',req.session.cart);
    // console.log('USERyyy',req.session.passport.user);
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
      // console.log('CARTxxx',req.session.cart);
      // console.log('USERxxx',req.session.passport.user);
      res.json(checkouts);
    });
  });
};
