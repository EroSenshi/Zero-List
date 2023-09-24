const express = require('express');
const router = express.Router();

// Ruta para obtener el tipo de usuario y el ID actual
router.get('/tipo-usuario', (req, res) => {
  if (req.session.loggedIn) {
    // Si el usuario está autenticado, envía el tipo de usuario y el ID del usuario almacenados en la sesión
    res.json({ tipoDeUsuario: req.session.tipoDeUsuario, id: req.session.id });
  } else {
    // Si el usuario no está autenticado, envía un valor predeterminado o un código de error
    res.json({ tipoDeUsuario: -1, id: null }); // Puedes definir otro valor si lo prefieres
  }
});

module.exports = router;

