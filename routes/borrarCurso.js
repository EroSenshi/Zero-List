const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser'); // Importa body-parser
const db = require('./db'); // Importa la referencia a la base de datos
const eliminarCursoRouter = require('./EliminarCurso'); // Importa el módulo de eliminación de cursos

app.use(bodyParser.urlencoded({ extended: true })); // Configura body-parser

app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

// Usa el módulo de eliminación de cursos
app.use(eliminarCursoRouter);

// Tu otra lógica de enrutamiento aquí

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
