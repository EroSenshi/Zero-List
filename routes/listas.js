const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta principal para /listas
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../public/views/listas.html');
    res.sendFile(filePath);
});

module.exports = router;
