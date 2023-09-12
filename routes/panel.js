const express = require('express');
const db = require('../db'); // Importar la referencia a la base de datos desde db.js
const app = express();
const axios = require('axios');

app.get('/cursos', async (req, res) => {
  try {
    const connection = await db.getConnection(); // Obtener una conexión a la base de datos

    // Realizar la consulta SQL para obtener cursos
    const [rows] = await connection.execute('SELECT * FROM cursos');

    // Liberar la conexión
    connection.release();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error en el servidor.');
  }
});

module.exports = app;

