const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "phoenixzero", // Cambia esto al nombre de tu base de datos
});

// Página de registro (GET)
router.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/registro.html"));
});

// Procesar registro (POST)
router.post("/registro", (req, res) => {
  const {
    nombreDeUsuario,
    nombre,
    contraseña,
    confirmarContraseña,
    tipoDeUsuario,
  } = req.body;

  // Verificar si las contraseñas coinciden
  if (contraseña !== confirmarContraseña) {
    return res.status(400).send("Las contraseñas no coinciden");
  }

  // Encriptar la contraseña
  bcrypt.hash(contraseña, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en el registro");
    } else {
      // Insertar el usuario en la base de datos
      const sql =
        "INSERT INTO usuarios (nombreDeUsuario, nombre, contraseña, tipoDeUsuario) VALUES (?, ?, ?, ?)";
      db.query(
        sql,
        [nombreDeUsuario, nombre, hash, tipoDeUsuario],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error en el registro");
          } else {
            // Redirigir con un indicador de registro exitoso
            res.redirect("/auth/inicio-sesion?registro=exitoso");
          }
        }
      );
    }
  });
});

// Página de inicio de sesión (GET)
router.get("/inicio-sesion", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/inicio-sesion.html"));
});
// Procesar inicio de sesión (POST)
router.post("/inicio-sesion", (req, res) => {
  const { nombreDeUsuario, contraseña } = req.body;

  // Verificar las credenciales en la base de datos
  const sql = "SELECT * FROM usuarios WHERE nombreDeUsuario = ?";
  db.query(sql, [nombreDeUsuario], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error en el inicio de sesión");
    } else if (results.length > 0) {
      const usuario = results[0];
      // Comparar la contraseña encriptada
      bcrypt.compare(contraseña, usuario.contraseña, (err, match) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error en el inicio de sesión");
        } else if (match) {
          req.session.loggedIn = true;
          req.session.nombreDeUsuario = nombreDeUsuario;
          // Obtener el tipo de usuario y almacenarlo en la sesión
          const tipoDeUsuario = usuario.tipoDeUsuario;
          req.session.tipoDeUsuario = tipoDeUsuario;

          // Obtener el ID de usuario y almacenarlo en la sesión
          const idUsuario = usuario.id; // Asegúrate de que tu tabla de usuarios tenga un campo 'id' para el ID de usuario
          req.session.idUsuario = idUsuario;

          res.redirect("/panel");
        } else {
          res.status(401).send("Credenciales incorrectas");
        }
      });
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  });
});

// Ruta para cerrar sesión
router.get("/cerrar-sesion", (req, res) => {
  // Realiza aquí cualquier lógica de cierre de sesión que necesites,
  // como destruir la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      res.status(500).send("Error al cerrar sesión");
    } else {
      res.send("Sesión cerrada exitosamente");
    }
  });
});

module.exports = router;
