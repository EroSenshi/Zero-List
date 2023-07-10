<?php
    // Conectar a la base datos
    $conn = new mysqli('localhost', 'id19887576_zerouseradmin', 'Demic799ak1323@', 'id19887576_asistencia');

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

?>