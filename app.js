const express = require('express');
const {
  PORT,
  DB_ADDRESS,
  limiter
} = require('./configs');

const mongoose = require('mongoose');

const routes = require('./routes');  // все роуты
const { requestLogger, errorLogger } = require('./middlewares/logger');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorsHandler } = require('./controllers/err');
const cors = require('cors');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(helmet());
app.use(requestLogger); // логгер запросов
app.use(limiter);
app.use('/', express.json()); // замена бодипарсера
app.use(cors());
app.use(routes); // все роуты в routes/index.js
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});