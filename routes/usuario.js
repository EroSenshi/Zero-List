const express = require('express');
const router = express.Router();

// Ruta para obtener el tipo de usuario actual
router.get('/tipo-usuario', (req, res) => {
    if (req.session.loggedIn) {
      // Si el usuario está autenticado, envía el tipo de usuario almacenado en la sesión
      res.json({ tipoDeUsuario: req.session.tipoDeUsuario });
    } else {
      // Si el usuario no está autenticado, envía un valor predeterminado o un código de error
      res.json({ tipoDeUsuario: -1 }); // Puedes definir otro valor si lo prefieres
    }
  });
  
module.exports = router;
