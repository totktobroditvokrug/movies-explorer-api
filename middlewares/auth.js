const jwt = require('jsonwebtoken');
const {
  JWT_SECRET_KEY,
} = require('../configs');

const User = require('../models/user');

const {
  ERROR_CODE,
  ERROR_AUTH,
  ERROR_ID,
} = require('../configs/err_const');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('ключ авторизации:', JWT_SECRET_KEY);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация');
    err.statusCode = ERROR_AUTH;
    return next(err);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      // console.log('проблемы с токеном');
      err.statusCode = ERROR_AUTH;
      err.message = 'проблемы с токеном';
    }
    // console.log('ошибка авторизации:', err.name);
    return next(err);
  }

  // console.log('пэйлоуд авторизации:', payload._id);
  return User.findById(payload._id) // смотрим, что такой пользователь есть
    .orFail(() => {
      const err = new Error('Not exist payload');
      err.name = 'NotExistPayload';
      err.statusCode = ERROR_ID;
      throw err;
    })
    .then(() => {
      req.user = payload; // записываем пейлоуд в объект запроса
      next(); // пропускаем запрос дальше
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // console.log('Не задан id пользователя');
        const error = new Error('Not valid id');
        error.statusCode = ERROR_CODE;
        return next(error);
      }
      return next(err);
    });
};
