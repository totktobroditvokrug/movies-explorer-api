const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  signupHandler,
  signinHandler,
} = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const errRoute = require('./err');

router.get('/test', (req, res) => {
  console.log('проверка роутов');
  res.status(200).send('test OK');
});

// Роуты авторизации
router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  }),
  signupHandler); // createUser
router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }).unknown(true),
  }),
  signinHandler); // login

router.use(auth); // защита остальных роутов авторизацией

// Роуты юзеров
router.use('/users', users);

// Роуты фильмов
router.use('/movies', movies);

// Остальные роуты
router.use('*', errRoute); // ошибка 404 на чуждые роуты и требует авторизации

module.exports = router;
