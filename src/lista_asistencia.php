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
    <link rel="stylesheet" href="../../public/styles/asistencia.css">
</head>
<body>
<nav>
    <img src="../../public/Assets/image.ico" alt="Logo">
    <h1>Asistencia de alumnos</h1>
    <div>
        <a href="lista_alumnos.php?id=<?php echo $curso_id; ?>" class="boton">Tomar Asistencias</a>
        <a href="mostrar_cursos.php">Mis cursos</a>
    </div>
</nav>

   <div class="container">
    <form method="post">
            <label for="fecha">Filtrar por fecha:</label>
            <input type="date" name="fecha" id="fecha">
            <label for="estado">Filtrar por estado:</label>
            <select name="estado" id="estado">
                <option value="">Todos</option>
                <option value="Presente">Presente</option>
                <option value="Ausente">Ausente</option>
            </select>
            <button type="submit">Filtrar</button>
        </form>
   </div>
        
 <div class="container">
        <?php

        $filtro_fecha = $_POST['fecha'] ?? '';
        $filtro_estado = $_POST['estado'] ?? '';

        // Realiza la consulta SQL con el filtro
        $sql = "SELECT alumnos.nombre, asistencia.alumno_id, asistencia.fecha_hora, asistencia.estado 
        FROM asistencia 
        LEFT JOIN alumnos ON asistencia.alumno_id = alumnos.user_id 
        LEFT JOIN cursos_alumnos ON asistencia.curso_id = cursos_alumnos.id_curso
        WHERE asistencia.curso_id = $curso_id";

        

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


