const mongoose = require('mongoose');
const db = require('../database/mongoIndex.js');

const criticSchema = new mongoose.Schema({
  id: Number,
  name: String,
  topCritic: Number,
  publisher: String,
  picture: String
});

const reviewSchema = new mongoose.Schema({
  id: Number,
  criticId: Number,
  text: String,
  rating: Number,
  movieId: Number,
  date: String
});

let Critic = mongoose.model('critic', criticSchema);
let Review = mongoose.model('review', reviewSchema);

module.exports = Critic;
module.exports = Review;