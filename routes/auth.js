const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'phoenixzero', // Cambia esto al nombre de tu base de datos
});

// Página de registro (GET)
router.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/registro.html'));
});

// Procesar registro (POST)
router.post('/registro', (req, res) => {
  const { nombreDeUsuario, nombre, contraseña, confirmarContraseña } = req.body;

  // Verificar si las contraseñas coinciden
  if (contraseña !== confirmarContraseña) {
    return res.status(400).send('Las contraseñas no coinciden');
  }

  // Encriptar la contraseña
  bcrypt.hash(contraseña, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el registro');
    } else {
      // Insertar el usuario en la base de datos
      const sql = 'INSERT INTO usuarios (nombreDeUsuario, nombre, contraseña) VALUES (?, ?, ?)';
      db.query(sql, [nombreDeUsuario, nombre, hash], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error en el registro');
        } else {
          res.redirect('/panel');
        }
      });
    }
  });
});

// Página de inicio de sesión (GET)
router.get('/inicio-sesion', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/inicio-sesion.html'));
});

// Procesar inicio de sesión (POST)
router.post('/inicio-sesion', (req, res) => {
  const { nombreDeUsuario, contraseña } = req.body;

  // Verificar las credenciales en la base de datos
  const sql = 'SELECT * FROM usuarios WHERE nombreDeUsuario = ?';
  db.query(sql, [nombreDeUsuario], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el inicio de sesión');
    } else if (results.length > 0) {
      const usuario = results[0];
      // Comparar la contraseña encriptada
      bcrypt.compare(contraseña, usuario.contraseña, (err, match) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error en el inicio de sesión');
        } else if (match) {
          req.session.loggedIn = true;
          req.session.nombreDeUsuario = nombreDeUsuario;
          res.redirect('/panel');
        } else {
          res.status(401).send('Credenciales incorrectas');
        }
      });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

module.exports = router;
