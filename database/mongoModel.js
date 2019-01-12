const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/badapples-reviews');

const criticSchema = mongoose.Schema({
  id: Number,
  name: String,
  topCritic: Number,
  publisher: String,
  picture: String
});

const reviewSchema = mongoose.Schema({
  id: Number,
  criticId: Number,
  text: String,
  rating: Number,
  movieId: Number,
  date: String
});

const Critic = mongoose.model('critic', criticSchema);
const Review = mongoose.model('review', reviewSchema);

module.exports = Critic;
module.exports = Review;