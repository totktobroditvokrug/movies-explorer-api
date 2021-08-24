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

const errRoute = (req, res, next) => {
  const err = new Error('Запрашиваемый ресурс не найден');
  err.statusCode = ERROR_ID;
  return next(err);
};

const errorsHandler = (err, req, res, next) => { // централизованный обработчик ошибок
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = {
  errorsHandler,
  errRoute,
};