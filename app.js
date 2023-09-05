require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos
const app = express();
const port = 3000;
const sessionSecretKey = process.env.SESSION_SECRET;

// Configuración de sesiones
app.use(session({
  secret: sessionSecretKey, // Cambia esto a una cadena segura
  resave: false,
  saveUninitialized: true
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importa y utiliza el enrutador
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Resto del código

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
