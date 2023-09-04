const express = require('express');
const router = express.Router();
const db = require('./db'); // Importa la referencia a la base de datos

// Ruta para eliminar un curso por su ID
router.post('/eliminar_curso', async (req, res) => {
  try {
    const id = req.body.id;

    // Verificar si el curso existe antes de eliminarlo (puedes agregar esta lógica según tus necesidades)
    const curso = await db.collection('curso').findOne({ _id: id });

    if (!curso) {
      res.status(404).send('Curso no encontrado');
      return;
    }

    await db.collection('curso').deleteOne({ _id: id });

    res.send('Curso eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    res.status(500).send('Hubo un error en el servidor.');
  }
});

module.exports = router;

  