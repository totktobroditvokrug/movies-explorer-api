const mongoose = require('mongoose');

const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  director: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 200,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId : {
    type: mongoose.Schema.Types.ObjectId,  // Возможно, заменить на HEX
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 1,
    maxlength: 200,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 1,
    maxlength: 200,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);