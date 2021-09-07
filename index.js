require('dotenv').config();
const express = require('express');
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')

const routes = require('./routes')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash())
app.use((req, res, next) => {
  res.locals.email = req.session.email;
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.role = req.session.role;
  next();
});

app.options('*', cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
