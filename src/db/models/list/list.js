const mongoose = require('mongoose');
const { Schema } = mongoose;

const placesScheme = new Schema({
  place: String,
  date: Date,
  price: Number
});

module.exports = Places = mongoose.model('places', placesScheme);