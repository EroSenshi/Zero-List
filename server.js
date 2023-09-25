const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();

const app = express();

// Configurar la sesión
app.use(session({
  secret: process.env.SECRETO,
  resave: false,
  saveUninitialized: true,
}));

// Configurar el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: false }));

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Rutas para los cursos
const cursosRoutes = require('./routes/cursos');
app.use('/cursos', cursosRoutes); // Asignar una ruta base para las rutas de cursos

// Rutas para el tipo de usuario
const usuarioRoutes = require('./routes/usuario');
app.use('/usuario', usuarioRoutes); // Asignar una ruta base para las rutas de usuario


  

// Rutas para la lista de asistencias
const listasRoutes = require('./routes/listas');
app.use('/listas', listasRoutes); // Asignar una ruta base para las rutas de listas

// Ruta de inicio (puede ser una página de bienvenida)
app.get('/', (req, res) => {
  // Redirige a la página de inicio de sesión
  res.redirect('/auth/inicio-sesion');
});

// Ruta del panel
app.get('/panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'panel.html'));
});

// Iniciar el servidor
const PORT = process.env.PUERTO || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
