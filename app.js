const express = require('express');
const {
  PORT,
  JWT_SECRET_KEY,
  DB_ADDRESS,
} = require('./configs');

const mongoose = require('mongoose');

const routes = require('./routes');  // все роуты

// const { requestLogger, errorLogger } = require('./middlewares/logger');

// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

const { errors } = require('celebrate');
// const usersRoutes = require('./routes/users');
// const cardsRoutes = require('./routes/cards');
// const errRoute = require('./routes/err');
// const login = require('./routes/users');
// const createUser = require('./routes/users');
// const auth = require('./middlewares/auth');
const { errorsHandler } = require('./controllers/err');
// const cors = require('cors');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

// app.use(helmet());
// app.use(limiter);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(requestLogger); // логгер запросов

// app.use(cors());

// app.use('*', errRoute); // ошибка 404 на чуждые роуты

// app.use(errorLogger); // логгер ошибок





const app = express();
app.use('/', express.json()); // замена бодипарсера

app.use(routes); // все роуты в routes/index.js
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`, app.mountpath);
});