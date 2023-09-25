const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const axios = require ('axios')



dotenv.config();

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'phoenixzero', // Cambia esto al nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});




// Función para obtener los cursos desde la base de datos para un usuario específico
function obtenerCursosPorIdUsuario(idUsuario, callback) {
  const sql = 'SELECT * FROM cursos WHERE idUsuario = ?';
  db.query(sql, [idUsuario], (err, results) => {
    if (err) {
      console.error('Error al obtener los cursos desde la base de datos:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

// Ejemplo de cómo utilizar la función en una ruta
router.get('/', async (req, res) => {
  try {
    // Obtener el idUsuario de la sesión
    const idUsuario = req.session.idUsuario;

    obtenerCursosPorIdUsuario(idUsuario, (err, cursos) => {
      if (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.status(200).json(cursos);
      }
    });
  } catch (error) {
    console.error('Error al obtener la lista de cursos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Ruta para agregar un nuevo curso
router.post('/agregar', (req, res) => {
  // Obtener los datos del nuevo curso desde la solicitud
  const { nombreCurso } = req.body;

  // Obtener el idUsuario de la sesión
  const idUsuario = req.session.idUsuario;

  // Realizar una consulta a la base de datos para agregar el curso
  const sql = 'INSERT INTO cursos (nombreDeCurso, idUsuario) VALUES (?, ?)';
  db.query(sql, [nombreCurso, idUsuario], (err, results) => {
    if (err) {
      console.error('Error al agregar el curso en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      // Devolver una respuesta exitosa en formato JSON
      res.status(200).json({ message: 'Curso agregado con éxito' });
    }
  });
});

// Ruta para entrar a un curso existente
router.post('/entrar', (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.loggedIn) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  // Obtener el ID del curso desde la solicitud
  const { idCurso } = req.body;

  // Obtener el ID del usuario desde la sesión
  const idUsuario = req.session.idUsuario;

  // Realizar una consulta a la base de datos para entrar al curso
  const sql = 'UPDATE cursos SET idUsuario = ? WHERE id = ?';
  db.query(sql, [idUsuario, idCurso], (err, results) => {
    if (err) {
      console.error('Error al entrar al curso en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      // Devolver una respuesta exitosa
      res.status(200).json({ message: 'Curso ingresado con éxito' });
    }
  });
});


// Ruta para editar un curso existente
router.put('/editar/:id', (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.loggedIn) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  // Obtener el ID del curso y el nuevo nombre desde la solicitud
  const { id } = req.params;
  const { nuevoNombre } = req.body;

  // Realizar una consulta a la base de datos para editar el curso
  const sql = 'UPDATE cursos SET nombre = ? WHERE id = ?';
  db.query(sql, [nuevoNombre, id], (err, results) => {
    if (err) {
      console.error('Error al editar el curso en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      // Devolver una respuesta exitosa
      res.status(200).json({ message: 'Curso editado con éxito' });
    }
  });
});

// Ruta para eliminar un curso existente
router.delete('/eliminar/:id', (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.loggedIn) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  // Obtener el ID del curso desde la solicitud
  const { id } = req.params;

  // Realizar una consulta a la base de datos para eliminar el curso
  const sql = 'DELETE FROM cursos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar el curso en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      // Devolver una respuesta exitosa
      res.status(200).json({ message: 'Curso eliminado con éxito' });
    }
  });
});


module.exports = router;
