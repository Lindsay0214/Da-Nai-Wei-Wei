require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const routes = require('./routes');
const errorHandler = require('./middlewares/error/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://jason-lin80826.github.io/',
      'http://localhost:3000',
      'http://0.0.0.0:3000',
    ],

    credentials: true,
    sameSite: 'none',
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false },
  })
);

app.use((req, res, next) => {
  res.locals.role = req.session.role;
  res.locals.userId = req.session.userId;
  next();
});

app.options('*', cors());
app.use('/', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
