const express = require('express');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
const axios = require('axios'); // Importar la biblioteca Axios

// Configurar sesión
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  })
);

// Agregar middleware para procesar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Conexión a la base de datos MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('../index.html', async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const db = client.db('your_database_name');
    const usersCollection = db.collection('usuarios');

    const user = await usersCollection.findOne({ usuario: username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.username = username;
        req.session.user_type = user.tipoDeUsuario;
        req.session.logged_in = true;

        setTimeout(() => {
          res.redirect('/panel');
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
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
