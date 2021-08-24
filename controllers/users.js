const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {  // коды ошибок
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

const {   // переменные окружения
  PORT,
  JWT_SECRET_KEY,
  DB_ADDRESS,
} = require('../configs');

const saltRounds = 10; // разрядность "соли" для хэша

const signupHandler = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  console.log('создание пользователя с e-mail:', email);
  if (!email || !password || !name) {
    const err = new Error('No user fields set');
    err.statusCode = ERROR_CODE;
    return next(err);
  }

  return bcrypt.hash(password, saltRounds)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          const userIssue = { ...user }; // убираем из выдачи поле пароля
          delete userIssue._doc.password;
          res.status(STATUS_OK).send({ data: userIssue._doc });
        })
        .catch((err) => {
          // console.log(err.name); // выдача ошибок валидации по схеме монгуса
          if (err.name === 'ValidationError') {
            const error = new Error('ValidationError');
            error.statusCode = ERROR_CODE;
            return next(error);
          }
          if (err.code === MONGO_DUPLICATE_EMAIL) {
            const error = new Error('User already exists');
            error.statusCode = ERROR_DUPLICATE;
            return next(error);
          }
          return next(err);
        });
    })
    .catch(next); // неведомая ошибка криптографии
};

const signinHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Не переданны email или пароль');
    err.statusCode = ERROR_CODE;
    return next(err);
  }
  // console.log('авторизация пользователя с email:', email);
  return User.findOne({ email }).select('+password') // поиск пользователя по email
    .orFail(() => {
      const err = new Error('Not valid login'); // если такого email нет в базе, то выдать общую ошибку
      err.name = 'NotValidLogin';
      err.statusCode = ERROR_LOGIN;
      throw err;
    })
    .then((user) => { // если найден, проверяем пароль и хэш
      // console.log('такой пользователь есть');
      bcrypt.compare(password, user.password)
        .then((matched) => { // булевый результат
          // console.log('совпадение пароля и хэша', matched);

          if (!matched) {
            // console.log('пароль не соответствует хэшу', matched);
            const err = new Error('Not valid password'); //
            err.name = 'NotValidLogin';
            err.statusCode = ERROR_LOGIN;
            return next(err);
          }
          // console.log('Пользователь найден и будет авторизован', user._id);
          // console.log('ключ авторизации:', JWT_SECRET_KEY);
          const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
          return res.status(STATUS_OK).send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

const getUserProfile = (req, res, next) => {
  const userId = req.user._id;
  // console.log('Авторизован пользователь с id=', userId);
  return User.findById(userId)
    .orFail(() => {
      const err = new Error('Not exist id');
      err.name = 'NotExistId';
      err.statusCode = ERROR_ID;
      throw err;
    })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Not valid id');
        error.statusCode = ERROR_CODE;
        return next(error);
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;
   console.log('обновление профиля', _id, name);
  if (!name || !_id) {
    const err = new Error('No user fields set');
    err.statusCode = ERROR_CODE;
    return next(err);
  }

  return User.findByIdAndUpdate(
    _id,
    { name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => {
      const err = new Error('Not exist id');
      err.name = 'NotExistId';
      err.statusCode = ERROR_ID;
      throw err;
    })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        const error = new Error('Not valid id');
        error.statusCode = ERROR_CODE;
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getUserProfile,
  updateProfile,
  signupHandler,
  signinHandler,
};