<?php
include('../config/db.php');
$nombre = "";

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
    <link rel="stylesheet" href="../public/styles/cursols.css">
</head>
<body>
    <nav>
        <h2>Bienvenido <?php echo $nombre; ?></h2>
        <a href="create.html">Generar Nuevo Curso</a>
    </nav>
    <h1 class="titulo">Lista de Cursos Disponibles</h1>
    <div class="carta-container">
        <?php
        // Consulta SQL para recuperar todos los cursos disponibles
        $sql = "SELECT id, nombre_curso FROM cursos";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $nombre_curso = $row['nombre_curso'];

                echo '<div class="carta">';
                echo '<div class="nombre-curso">' . $nombre_curso . '</div>';
                echo '<div class="botones">';
                echo '<a href="union_alumno.php?id=' . $row['id'] . '" class="boton">Inscribirse</a>';
                // Puedes agregar más acciones según tus necesidades
                echo '</div>';
                echo '</div>';
            }
        } else {
            echo "<p class='error-message'>No se encontraron cursos disponibles en la base de datos.</p>";
        }

        // Cerrar la conexión a la base de datos
        $conn->close();
        ?>
    </div>
</body>
</html>