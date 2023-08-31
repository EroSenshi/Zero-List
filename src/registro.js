const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db'); // Importar la referencia a la base de datos desde db.js
const app = express();
const port = 3000;

// Resto del código

app.post('/registro', async (req, res) => {
  const { nombre, usuario, password, confirm_password } = req.body;

  try {
    const usersCollection = db.collection('usuarios');

    const existingUser = await usersCollection.findOne({ usuario });

    if (existingUser) {
      res.send('<p>Error: El usuario ya existe, elija otro.</p>');
    } else if (password !== confirm_password) {
      res.send('<p>Error: Las contraseñas no coinciden.</p>');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); // Salting con factor de trabajo 10

      await usersCollection.insertOne({
        nombre,
        usuario,
        password: hashedPassword,
        tipoDeUsuario: 1
      });

      res.redirect('/index.html'); // Cambia a la ruta correcta
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
