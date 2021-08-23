const router = require('express').Router();
const {
  signupHandler,
  signinHandler,
} = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');

router.get('/test', (req, res) => {
  console.log('проверка роутов');
  res.status(200).send('test OK');
} );

// Роуты авторизации
router.post('/signup', signupHandler); // createUser
router.post('/signin', signinHandler); // login

// router.use(auth); // защита остальных роутов авторизацией

// Роуты юзеров
router.use('/users', auth, users);

// Роуты фильмов
router.use('/movies', auth, movies);

module.exports = router;