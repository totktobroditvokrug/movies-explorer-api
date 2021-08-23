require('dotenv').config();

const { PORT=3000,
  JWT_SECRET_KEY='dev_secret',
  DB_ADDRESS='mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET_KEY,
  DB_ADDRESS,
}