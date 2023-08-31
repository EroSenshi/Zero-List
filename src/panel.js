const express = require('express');
const session = require('express-session');
const db = require('./db'); // Importar la referencia a la base de datos desde db.js
const app = express();
const port = 3000;
const axios = require('axios');

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

app.get('/cursos', async (req, res) => {
  try {
    const cursosCollection = db.collection('curso');
    const cursos = await cursosCollection.find().toArray();
    res.json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error en el servidor.');
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
