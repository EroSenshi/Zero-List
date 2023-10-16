<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Curso</title>
</head>
<body>
    <h1>Editar Curso</h1>
    <?php
    // Conectar a la base de datos (reemplaza con tus propios datos de conexión)
    include('../../config/db.php');

    // Obtener el ID del curso a editar
    $curso_id = $_GET["id"];

    // Consulta SQL para obtener el nombre del curso
    $sql = "SELECT nombre_curso FROM cursos WHERE id = $curso_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nombre_curso = $row["nombre_curso"];
    } else {
        echo "Curso no encontrado.";
        exit;
    }

    // Procesar el formulario de edición
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nuevo_nombre_curso = $_POST["nombre_curso"];
        $sql = "UPDATE cursos SET nombre_curso = '$nuevo_nombre_curso' WHERE id = $curso_id";
        if ($conn->query($sql) === TRUE) {
            header("Location: mostrar_cursos.php");
            exit;
        } else {
            echo "Error al editar el curso: " . $conn->error;
        }
    }
    ?>
    <form method="POST" action="">
        <label for="nombre_curso">Nombre del Curso:</label>
        <input type="text" id="nombre_curso" name="nombre_curso" value="<?php echo $nombre_curso; ?>" required>
        <br>
        <input type="submit" value="Guardar Cambios">
    </form>
    <a href="mostrar_cursos.php">Volver a la Lista de Cursos</a>
</body>
</html>
