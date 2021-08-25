const router = require('express').Router();
const {
  errRoute,
} = require('../controllers/err');

router.get('*', errRoute);

module.exports = router;
