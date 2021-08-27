const router = require('express').Router();
const {
  errRoute,
} = require('../controllers/err');

router.all('*', errRoute);

module.exports = router;
