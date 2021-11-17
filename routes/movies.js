const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const {
  getSavedMovies,
  createMovie,
  delMovieById,
} = require('../controllers/movies');

router.get('', getSavedMovies);
router.post('',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(1).max(200),
      director: Joi.string().required().min(1).max(200),
      duration: Joi.number().required(),
      year: Joi.string().min(2).max(4).required(),
      description: Joi.string().min(1).max(2000),
      image: Joi.string().min(1).max(300),
      trailer: Joi.string().custom(checkURL),
      thumbnail: Joi.string().min(1).max(300),
      owner: Joi.string().required().length(24).hex(),
      movieId: Joi.number().required(), // внешний айдишник практикума
      nameRU: Joi.string().min(1).max(200),
      nameEN: Joi.string().min(1).max(200),
    }).unknown(true),
  }),
  createMovie);
router.delete('/:movieId', // внутренний айди монгодб
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  delMovieById);

module.exports = router;
