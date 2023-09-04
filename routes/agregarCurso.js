const express = require('express');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const bodyParser = require('body-parser'); // Importa body-parser

app.use(bodyParser.urlencoded({ extended: true })); // Configura body-parser

// Configurar sesión
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  })
);

// Conexión a la base de datos MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

app.get('/cursos', async (req, res) => {
  // Lógica para obtener cursos desde la base de datos
});

app.post('/add_curso', async (req, res) => {
  try {
    const db = await client.connect();
    const cursoCollection = db.db('id19887576_asistencia').collection('curso');

    const nombre = req.body.nombre;

    // Verificar si el nombre del curso ya existe (puedes agregar esta lógica según tus necesidades)

    await cursoCollection.insertOne({
      nombreCurso: nombre
    });

    res.redirect('/panel'); // Cambia a la ruta correcta
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error en el servidor.');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
