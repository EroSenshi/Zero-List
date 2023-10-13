<?php
include('../../config/db.php');
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
    <title>Mostrar Cursos</title>
</head>
<body>
    <nav>
        <a href="create.html">Generar Nuevo Curso</a>
        <h2>Bienvenido <?php echo $nombre; ?></h2>
    </nav>
    <h1>Lista de Cursos</h1>
    <ul>
        <?php

        // Consulta SQL para recuperar los cursos
        $sql = "SELECT id, nombre_curso FROM cursos WHERE id_profesor = $user_id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $nombre_curso = $row['nombre_curso'];
                echo "<li>$nombre_curso <a href='ver_alumnos.php?id={$row['id']}'>Ver Alumnos</a><a href='update.php?id={$row['id']}'>Editar</a> <a href='delete.php?id={$row['id']}'>Eliminar</a></li>";
            }
        } else {
            echo "No se encontraron cursos en la base de datos.";
        }

        // Cerrar la conexión a la base de datos
        $conn->close();
        ?>
    </ul>
</body>
</html>
