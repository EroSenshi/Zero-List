// En routes/cursos.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'phoenixzero', // Cambia esto al nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Definir la ruta para obtener cursos
router.get('/', (req, res) => {
  // Realizar una consulta a la base de datos para obtener los cursos
  const sql = 'SELECT * FROM cursos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener cursos desde la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      // Devolver los resultados como respuesta JSON
      res.json(results);
    }
  });
});

module.exports = router;
