const mongoose = require("mongoose");
const {Schema} = mongoose;

const itemsSchema = new Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

mongoose.model('items', itemsSchema);
