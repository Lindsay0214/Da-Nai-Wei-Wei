require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// passport test
const passport = require('passport');

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

app.use((req, res, next) => {
  res.locals.email = req.session.email;
  res.locals.role = req.session.role;
  res.locals.userId = req.session.userId;
  next();
});

// passport test
app.use(passport.initialize());
app.use(passport.session());

// app.options('*', cors());
app.use('/', routes);

app.get('*', (req, res)=> {
  const index = path.join(__dirname, '/', './routes', 'index.html' );
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
