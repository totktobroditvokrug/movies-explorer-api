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
  res.status(STATUS_OK).send('роут создания фильма');
}

const delMovieById = (req, res, next) => {
  const { movieId } = req.params;
  res.status(STATUS_OK).send(`роут удаления фильма ${movieId}`);
}

module.exports = {
  getSavedMovies,
  createMovie,
  delMovieById
};