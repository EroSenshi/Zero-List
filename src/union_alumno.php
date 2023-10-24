<?php
include('../config/db.php');
    // Obtener el ID del usuario desde la cookie
    if (isset($_COOKIE["user_id"])) {
        $user_id = $_COOKIE["user_id"];
    } else {
        echo "No se encontró la cookie del usuario.";
        exit;
    }
    $curso_id = $_GET["id"];
    // Insertar datos en la tabla cursos_alumnos
    $sql = "INSERT INTO cursos_alumnos (id_curso, id_alumno) VALUES ($curso_id, $user_id)";
    
    if ($conn->query($sql) === TRUE) {
        echo "Inscripción exitosa en el curso.";
        header("Location: cursos_alumnos.php");
        exit();
    } else {
        echo "Error al inscribirse en el curso: " . $conn->error;
    }

    // Cerrar la conexión a la base de datos
    $conn->close();
?>