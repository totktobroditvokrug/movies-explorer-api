const router = require('express').Router();

const {
  getSavedMovies,
  createMovie,
  delMovieById
} = require('../controllers/movies');

router.get('', getSavedMovies);
router.post('', createMovie);
router.delete('/:movieId', delMovieById);

module.exports = router;