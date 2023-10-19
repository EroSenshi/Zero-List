<?php
include('../config/db.php');
$nombre="";
if (isset($_COOKIE["user_id"])) {
    $user_id = $_COOKIE["user_id"];
    
    // No es necesario incluir la conexión nuevamente aquí, ya que se incluyó arriba

    // Realiza la consulta SQL para obtener el nombre del usuario
    $query = "SELECT nombre FROM usuarios WHERE id = $user_id";
    $result = $conn->query($query);
    
    // Verifica si la consulta fue exitosa
    if ($result) {
        // Obtiene el resultado de la consulta
        $row = $result->fetch_assoc();
        
        // El nombre del usuario se encuentra en $row['nombre']
        $nombre = $row['nombre'];
    }
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Curso</title>
    <link rel="stylesheet" href="../public/styles/create.css">
</head>
<body>
<nav>
        <h2>Bienvenido <?php echo $nombre; ?></h2>
        <a href="../public/views/mostrar_cursos.php">Panel de Cursos</a>
    </nav>  
    <?php
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
</body>
</html>