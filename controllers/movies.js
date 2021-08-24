const Movie = require('../models/movie');

const {
  STATUS_OK,
  ERROR_CODE,
  ERROR_DEF,
  ERROR_LOGIN,
  ERROR_DUPLICATE,
  MONGO_DUPLICATE_EMAIL,
  ERROR_AUTH,
  ERROR_ID,
  ERROR_ACCES,
} = require('../configs/err_const');


const getSavedMovies = (req, res, next) => {
  res.status(STATUS_OK).send('получить сохраненые фильмы');
}

const createMovie = (req, res, next) => {
  const owner = req.user._id; // можно добавить обработку на случай ошибки в коде авторизации
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  } = req.body;
  // console.log('пытаемся создать карточку', name, link, owner);
  Movie.create({
     country,
     director,
     duration,
     year,
     description,
     image,
     trailer,
     thumbnail,
     owner,
     movieId,
     nameRU,
     nameEN
    })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error(err.message);
        error.statusCode = ERROR_CODE;
        return next(error);
      }
      if (err.name === 'CastError') {
        const error = new Error('Not valid id');
        error.statusCode = ERROR_CODE;
        return next(error);
      }
      return next(err);
    });
};
// const createMovie = (req, res, next) => {
//   res.status(STATUS_OK).send('роут создания фильма');
// }

const delMovieById = (req, res, next) => {
  const { movieId } = req.params;
  res.status(STATUS_OK).send(`роут удаления фильма ${movieId}`);
}

module.exports = {
  getSavedMovies,
  createMovie,
  delMovieById
};