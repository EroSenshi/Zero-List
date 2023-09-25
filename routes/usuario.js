const express = require('express');
const router = express.Router();


router.get('/tipo-usuario', (req, res) => {
  if (req.session.loggedIn) {
    // Envía el tipo de usuario y el ID de usuario almacenados en la sesión
    res.json({ tipoDeUsuario: req.session.tipoDeUsuario, idUsuario: req.session.idUsuario });
  } else {
    // Si el usuario no está autenticado, envía un valor predeterminado o un código de error
    res.json({ tipoDeUsuario: -1, idUsuario: null });
  }
});


module.exports = router;

