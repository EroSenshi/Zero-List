<?php
    // Conectar a la base datos
    $conn = new mysqli('localhost', 'root', '', 'asistencia');

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

?>