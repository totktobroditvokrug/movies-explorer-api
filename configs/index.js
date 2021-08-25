require('dotenv').config();
const rateLimit = require('express-rate-limit');

const { PORT=3000,
  JWT_SECRET_KEY='dev_secret',
  DB_ADDRESS='mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = {
  PORT,
  JWT_SECRET_KEY,
  DB_ADDRESS,
  limiter
}