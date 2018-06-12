const mongoose = require('mongoose');

const { Schema } = mongoose;

const checkoutsSchema = new Schema({
  user: String,
  date: { type: Date, default: new Date() },
  cart: [{
    title: String,
    description: String,
    images: String,
    price: Number,
    quantity: Number,
  }],
  totalAmount: Number,
});

mongoose.model('checkouts', checkoutsSchema);
