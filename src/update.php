<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Curso</title>
    <link rel="stylesheet" href="../public/styles/create.css">
</head>
<body>
<header>
        <img src="logo.png" alt="">
        <nav class="navigation">
        <a href="mostrar_cursos.php"><button class="curso-boton">Panel de Curso</button></a> 
        </nav>
    </header>
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
     <div class="box">
    <h2>Editar Curso</h2>
    <form method="POST" action="">
        <div class="curso-box">
            <input type="text" id="viejo_nombre" name="viejo_nombre" value="<?php echo $nombre_curso; ?>" >
            <label for="nombre_curso2">Nombre del Curso:</label>
        </div>
        <div class="curso-box">
            <input type="text" id="nombre_curso" name="nombre_curso" required> <!-- Cambiado a "nombre_curso" -->
            <label for="nombre_curso">Nuevo Nombre:</label>
        </div>
        <input class="boton" type="submit" value="Guardar Cambios">
    </form>
</div>

    <a href="mostrar_cursos.php">Volver a la Lista de Cursos</a>
</body>
</html>