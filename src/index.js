const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db'); // Importar la referencia a la base de datos desde db.js
const app = express();
const port = 3000;

// Resto del código

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usersCollection = db.collection('usuarios');

    const user = await usersCollection.findOne({ usuario: username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.username = username;
        req.session.user_type = user.tipoDeUsuario;
        req.session.logged_in = true;

        setTimeout(() => {
          res.redirect('/panel'); // Cambia a la ruta correcta
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

// Resto del código

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
