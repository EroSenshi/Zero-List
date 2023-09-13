const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2/promise');
require('dotenv').config();
const sessionSecretKey = process.env.SESSION_SECRET;

app.use(session({
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Redirige desde la raíz a /login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/panel', (req, res, next) => {
  if (req.session.logged_in) {
    const panelRouter = require('./routes/panel');
    app.use('/panel', panelRouter);
    next();
  } else {
    res.redirect('/');
  }
});

// Resto del código

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
