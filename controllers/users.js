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

const signupHandler = (req, res, next) => {  // создание пользователя
  res.status(STATUS_OK).send('роут создания пользователя');
}

const signinHandler = (req, res, next) => {  // авторизация пользователя
  res.status(STATUS_OK).send('роут авторизации пользователя');
}

const getUserProfile = (req, res, next) => {
  res.status(STATUS_OK).send('роут получения профиля');
}

const updateProfile = (req, res, next) => {
  res.status(200).send('роут редактирования профиля');
}

module.exports = {
  getUserProfile,
  updateProfile,
  signupHandler,
  signinHandler,
};