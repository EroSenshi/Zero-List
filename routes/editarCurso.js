const express = require('express');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

// Conexión a la base de datos MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

app.get('/panel', async (req, res) => {
  // Lógica para cargar la página de panel o cursos
});

app.post('/editar_curso', async (req, res) => {
  try {
    const db = await client.connect();
    const cursosCollection = db.db('id19887576_asistencia').collection('curso');

    const id = parseInt(req.body.id); // Convertir a entero
    const nombre = req.body.nombre;

    await cursosCollection.updateOne({ _id: id }, { $set: { nombreCurso: nombre } });

    res.redirect('/panel');
  } catch (error) {
    console.error('Error al editar el curso:', error);
    res.status(500).send('Hubo un error en el servidor.');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
