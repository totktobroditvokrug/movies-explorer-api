const Movie = require('../models/movie');

const {
  STATUS_OK,
  ERROR_CODE,
  ERROR_ID,
  ERROR_ACCES,
} = require('../configs/err_const');

const getSavedMovies = (req, res, next) => Movie.find({owner: req.user._id})
  .then((movie) => {
    if (!movie) {
      const err = new Error('Карточки не найдены');
      err.statusCode = ERROR_ID;
      throw err;
    }
    res.status(STATUS_OK).send(movie);
  })
  .catch(next);

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
    nameEN,
  } = req.body;

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
    nameEN,
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

const delMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findOne({ _id: movieId }) // ----- Ищем карточку перед удалением
    .orFail(() => {
      // console.log('карточка не найдена');
      const err = new Error('Not exist movie id');
      err.statusCode = ERROR_ID;
      throw err;
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) { // Проверка пользователя на права удаления карточки
        return Movie.findOneAndRemove({ _id: movieId })
          .orFail(() => {
            const err = new Error('Not exist id');
            err.statusCode = ERROR_ID;
            throw err;
          })
          .then((result) => res.status(STATUS_OK).send(result));
      }

      const err = new Error(`Пользователь с id=${userId} не имеет прав на удаление этой карточки`);
      err.statusCode = ERROR_ACCES;
      throw err;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Not exist movie id');
        error.statusCode = ERROR_CODE;
        return next(error);
      }
      return next(err);
    });
};


module.exports = {
  getSavedMovies,
  createMovie,
  delMovieById,
};
