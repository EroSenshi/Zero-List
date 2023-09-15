const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Importa la referencia a la base de datos desde db.js
const router = express.Router();

// Middleware para parsear datos del formulario
router.use(express.urlencoded({ extended: true }));

// Ruta POST para procesar el registro de usuarios
router.post('/registro', async (req, res) => { // Cambiado el manejador de ruta a /registro.html
  const { nombre, usuario, password, confirm_password } = req.body;

  try {
    const connection = db; // Usa la conexión importada desde db.js

    const [existingUser] = await connection.execute('SELECT * FROM usuarios WHERE nombreDeUsuario = ?', [usuario]);

    if (existingUser.length > 0) {
      res.send('<p>Error: El usuario ya existe, elija otro.</p>');
    } else if (password !== confirm_password) {
      res.send('<p>Error: Las contraseñas no coinciden.</p>');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await connection.execute('INSERT INTO usuarios (nombreDeUsuario, tipoDeUsuario, nombre, contraseña) VALUES (?, ?, ?, ?)', [usuario, '1', nombre, hashedPassword]);

      res.redirect('/index.html'); // Cambia a la ruta correcta
    }
  } catch (error) {
    console.error(error);
    res.send('Hubo un error en el servidor.');
  }
});

module.exports = router;
