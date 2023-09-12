const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // Importar la referencia a la base de datos MySQL desde db.js
const path = require('path'); // Importar el módulo 'path' para manejar rutas de archivos
const router = express.Router();

// Middleware para parsear datos del formulario
router.use(express.urlencoded({ extended: true }));

// Ruta GET para mostrar la página de inicio de sesión
router.get('/login', (req, res) => {
  // Envia la página HTML de inicio de sesión
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// Ruta POST para procesar el inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = db; // Utiliza la referencia a la base de datos MySQL

    // Realiza una consulta SQL para buscar el usuario por nombre de usuario
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    const [rows] = await pool.execute(query, [username]);
    const user = rows[0];

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.username = username;
        req.session.user_type = user.tipoDeUsuario;
        req.session.logged_in = true;

        setTimeout(() => {
          res.redirect('/panel'); // Cambia a la ruta correcta después del inicio de sesión
        }, 5000);
      } else {
        res.send('<p>Error: Nombre de usuario o contraseña incorrectos.</p>');
      }
    } else {
      res.send('<p>Error: Nombre de usuario o contraseña incorrectos.</p>');
    }
  } catch (error) {
    console.error(error);
    res.send('Hubo un error en el servidor.');
  }
});

// Otras rutas y controladores

module.exports = router; // Exportar el router
