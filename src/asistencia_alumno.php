<?php
include('../../config/db.php');
if (isset($_COOKIE["user_id"]) && !empty($_COOKIE["user_id"])) {
    $user_id = $_COOKIE["user_id"];
    $curso_id = $_GET["id"];
    // Realiza la consulta SQL para obtener el nombre del usuario
    $query = "SELECT nombre FROM usuarios WHERE id = $user_id";
    $result = $conn->query($query);

    // Verifica si la consulta fue exitosa
    if ($result) {
        // Obtiene el resultado de la consulta
        $row = $result->fetch_assoc();
        // El nombre del usuario se encuentra en $row['nombre']
        $nombre = $row['nombre'];
        $curso_id = $_GET["id"];
    } else {
        // Aquí puedes agregar un mensaje de error o log de errores
        // y luego redireccionar al usuario al login
        header("Location: ../../public/views/login.html");
    }
} else {
    // La cookie "user_id" no está configurada, por lo que redirige al usuario al login
    header("Location: ../../public/views/login.html");
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Alumnos</title>
    <link rel="stylesheet" href="../../public/styles/">
</head>
<body>
<nav>
    <h2>Bienvenido <?php echo $nombre; ?></h2>
    <div>
        <a href="mostrar_cursos.php">Mis cursos</a>
    </div>
</nav>  
    <h1>Asistencia de alumnos</h1>
       
        <div class="container">
        <?php

        $filtro_fecha = $_POST['fecha'] ?? '';
        $filtro_estado = $_POST['estado'] ?? '';

        // Realiza la consulta SQL con el filtro
        $sql = "SELECT usuarios.nombre, asistencia.fecha_hora, asistencia.estado FROM cursos_alumnos
                INNER JOIN usuarios ON cursos_alumnos.id_alumno = usuarios.id
                LEFT JOIN asistencia ON cursos_alumnos.id_alumno = asistencia.alumno_id
                WHERE cursos_alumnos.id_curso = $curso_id AND cursos_alumnos.id_alumno = $user_id";

        if (!empty($filtro_fecha)) {
            $sql .= " AND DATE(asistencia.fecha_hora) = '$filtro_fecha'";
        }

        if (!empty($filtro_estado)) {
            $sql .= " AND asistencia.estado = '$filtro_estado'";
        }

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            echo "<ul>";
            while ($row = $result->fetch_assoc()) {
                $nombre = $row['nombre'];
                $fecha_hora = $row['fecha_hora'];
                $estado = $row['estado'];

                echo "<li>Nombre: $nombre<br>Fecha y Hora: $fecha_hora<br>Estado: $estado</li>";
            }
            echo "</ul>";
        } else {
            echo "<p class='no-data'>No se encontraron alumnos con los criterios de filtro seleccionados.</p>";
        }

        // Cerrar la conexión a la base de datos
        $conn->close();
        ?>
    </div>
</body>
</html>

