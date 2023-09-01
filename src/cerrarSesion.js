const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Configurar sesión
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  })
);

// Ruta para destruir la sesión y redirigir al usuario a la página de inicio
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
      res.status(500).send('Error al cerrar la sesión');
    } else {
      console.log('Sesión destruida correctamente');
      res.redirect('/index.html'); // Cambia a la ruta correcta de tu página de inicio
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
