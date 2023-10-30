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
    <link rel="stylesheet" href="../../public/styles/lista.css">
    <meta charset="UTF-8">
    <title>Asistencia de Alumnos</title>
</head>
<body>
<nav>
    <img src="../../public/Assets/image.ico" alt="Logo">
    <h1 class="titulo">Lista de Alumnos</h1>
    <div>
        <?php echo '<a href="lista_asistencia.php?id=' . $curso_id . '" class="boton">Ver Asistencias</a>'; ?>
        <a href="cursos_alumnos.php">Mis cursos</a> 
    </div>
</nav>  

   <?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $alumno_id = $_POST['alumno_id'];
    $estado = $_POST['estado'];
    $fecha_hora = date('Y-m-d H:i:s');

    $stmt = $conn->prepare("INSERT INTO asistencia (alumno_id, fecha_hora, estado, curso_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('issi', $alumno_id, $fecha_hora, $estado, $curso_id);
    $stmt->execute();
}
$curso_id = $_GET['id'];
$result = $conn->query("SELECT alumnos.id_user, alumnos.nombre FROM alumnos JOIN cursos_alumnos ON alumnos.id_user = cursos_alumnos.id_alumno WHERE cursos_alumnos.id_curso = $curso_id");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<form class='attendance-form' method='post'>";
        echo "<div class='student-info'>";
        echo "<p class='student-name'>Alumno: " . $row['nombre'] . "</p>";
        echo "</div>";
        echo "<div class='attendance-buttons'>";
        echo "<input type='hidden' name='alumno_id' value='" . $row['id'] . "'>";
        echo "<button class='attendance-button present-button' type='submit' name='estado' value='presente'>Presente</button>";
        echo "<button class='attendance-button absent-button' type='submit' name='estado' value='ausente'>Ausente</button>";
        echo "</div>";
        echo "</form>";
        
        
    }
} else {
    echo "<div class='error-message'>No hay alumnos registrados.</div>";
}
?>

</body>
</html>