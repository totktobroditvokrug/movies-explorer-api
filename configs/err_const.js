const STATUS_OK = 200; //
const ERROR_CODE = 400; //  переданы некорректные данные
const ERROR_ID = 404; //  карточка или пользователь не найден
const ERROR_DEF = 500; //  ошибка по умолчанию
const ERROR_LOGIN = 401; //  неверные пароль/емэйл
const ERROR_DUPLICATE = 409; //  пользователь уже существует
const ERROR_AUTH = 401;
const ERROR_ACCES = 403;

const MONGO_DUPLICATE_EMAIL = 11000; //  такой емэйл уже существует

module.exports = {
  STATUS_OK,
  ERROR_CODE,
  ERROR_DEF,
  ERROR_LOGIN,
  ERROR_DUPLICATE,
  MONGO_DUPLICATE_EMAIL,
  ERROR_AUTH,
  ERROR_ID,
  ERROR_ACCES,
};