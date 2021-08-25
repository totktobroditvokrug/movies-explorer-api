const {
  ERROR_ID,
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
