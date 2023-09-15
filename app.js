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

// Configura el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const registroRouter = require('./routes/registro');
const panelRouter = require('./routes/panel');

app.use('/', indexRouter);
app.use('/registro', registroRouter);
app.use('/panel', panelRouter);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
