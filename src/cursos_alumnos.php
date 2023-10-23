<?php
include('../config/db.php');
$nombre="";
if (isset($_COOKIE["user_id"])) {
    $user_id = $_COOKIE["user_id"];
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
    <link rel="stylesheet" href="../public/styles/cursoalum.css">
</head>
<body>
    <nav>
        <h2>Bienvenido <?php echo $nombre; ?></h2>
        <a href="lista_cursos.php">Ver Cursos</a>
    </nav>  
    <h1 class="titulo">Lista de Mis Cursos</h1>
    <div class="carta-container">
<?php

$sql = "SELECT cursos.id, cursos.nombre_curso FROM cursos
    JOIN cursos_alumnos ON cursos.id = cursos_alumnos.id_curso
    WHERE cursos_alumnos.id_alumno = $user_id";

$result = mysqli_query($conn, $sql);

// Verifica si hay resultados
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $nombre_curso = $row['nombre_curso'];
                echo '<div class="carta">';
                echo '<div class="nombre-curso">' . $nombre_curso . '</div>';
                echo '<div class="botones">';
                echo '<a href="asistencia_alumno.php?id=' . $row['id'] . '" class="boton">Ver Asistencia</a>';
                echo '<a href="delete_union.php?id=' . $row['id'] . '" class="boton-delete">Salir del curso</a>';  
                echo '</div>';
                echo '</div>';
    }
} else {
    echo "No se encontraron cursos para este usuario.";
}

// Cierra la conexión a la base de datos
mysqli_close($conn);

?>
 </div>
</body>
</html>