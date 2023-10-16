<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="../styles/style.css">
    <meta charset="UTF-8">
    <title>Asistencia de Alumnos</title>
    <style>
       
    </style>
</head>
<body>
    <h1>Lista de Alumnos</h1>
   <?php
    include('../../config/db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $alumno_id = $_POST['alumno_id'];
    $estado = $_POST['estado'];
    $fecha_hora = date('Y-m-d H:i:s');

    $stmt = $conn->prepare("INSERT INTO asistencia (alumno_id, fecha_hora, estado) VALUES (?, ?, ?)");
    $stmt->bind_param('iss', $alumno_id, $fecha_hora, $estado);
    $stmt->execute();
}
$curso_id = $_GET['id'];
$result = $conn->query("SELECT usuarios.id, usuarios.nombre FROM usuarios JOIN cursos_alumnos ON usuarios.id = cursos_alumnos.id_alumno WHERE cursos_alumnos.id_curso = $curso_id");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<form class='attendance-form' method='post'>";
        echo "<input type='hidden' name='alumno_id' value='" . $row['id'] . "'>";
        echo "<p class='student-name'>Alumno: " . $row['nombre'] . "</p>";
        echo "<button class='attendance-button present-button' type='submit' name='estado' value='presente'>Presente</button>";
        echo "<button class='attendance-button absent-button' type='submit' name='estado' value='ausente'>Ausente</button>";
        echo "</form>";
        
    }
} else {
    echo "No hay alumnos registrados.";
}
?>
</body>
</html>