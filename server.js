const express = require('express');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configurar la sesión
app.use(session({
  secret: process.env.SECRETO,
  resave: false,
  saveUninitialized: true,
}));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'phoenixzero', // Cambia esto al nombre de tu base de datos
});

// Comprobar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Configurar el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: false }));

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Ruta de inicio (es una página de inicio de sesión)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/inicio-sesion.html'));
});


// Iniciar el servidor
const PORT = process.env.PUERTO || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
