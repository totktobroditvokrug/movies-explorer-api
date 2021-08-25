const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserProfile,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getUserProfile);
router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  }),
  updateProfile);

module.exports = router;
