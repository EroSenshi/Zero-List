<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["crear_curso"])) {
    // Conectar a la base de datos (reemplaza estos valores con los tuyos)
     include('../config/db.php');
    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Error en la conexión a la base de datos: " . $conn->connect_error);
    }

    $nombre_curso = $_POST["nombre_curso"];

    // Insertar el nuevo curso en la tabla "cursos"
    $sql = "INSERT INTO cursos (nombre_curso) VALUES ('$nombre_curso')";

    if ($conn->query($sql) === TRUE) {
        echo "Curso creado con éxito.";
        header("Location: panel_cursos.php");
        exit();
    } else {
        echo "Error al crear el curso: " . $conn->error;
    }

    $conn->close();
}
?>
