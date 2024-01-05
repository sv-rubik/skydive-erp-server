require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 5000, BASE_PATH = 'localhost' } = process.env;
const cors = require('cors');

// защита приложения
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
app.use(cors());

// const userRouter = require('./routes/users');
// const cardRouter = require('./routes/cards');
const rigsRouter = require('./routes/rigs')
const aadsRouter = require('./routes/aads')
// const { createUser, login } = require('./controllers/users');
// const auth = require('./middlewares/auth');
// const NotFoundError = require('./utils/errors/NotFoundError');

app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/erpskydive');

// Добавляем middleware для разбора JSON
app.use(express.json());


// Регистрация и логин (с валидацией Celebrate)
// app.post('/signin', validateLogin, login);
// app.post('/signup', validateCreateUser, createUser);

// eslint-disable-next-line max-len
// users указывает на базовый путь для всех маршрутов, определенных внутри userRouter из файла routes/users.js
// auth - middleware для авторизации
// app.use('/users', auth, userRouter);
// app.use('/cards', auth, cardRouter);
app.use('/rigs', rigsRouter )
app.use('/aads', aadsRouter )
// app.use('*', auth, (req, res, next) => {
//   next(new NotFoundError('Такой страницы не существует'));
// });


app.listen(PORT, () => {
  console.log(`App listening on ${BASE_PATH}:${PORT}`);
});
