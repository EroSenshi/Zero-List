<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $alumno_id = $_POST['alumno_id'];
    $estado = $_POST['estado'];
    $fecha_hora = date('Y-m-d H:i:s');

    $stmt = $db->prepare("INSERT INTO asistencia (alumno_id, fecha_hora, estado) VALUES (?, ?, ?)");
    $stmt->bind_param('iss', $alumno_id, $fecha_hora, $estado);
    $stmt->execute();
}

$result = $db->query("SELECT id, nombre FROM alumnos");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<form method='post'>";
        echo "<input type='hidden' name='alumno_id' value='" . $row['id'] . "'>";
        echo "<p>Alumno: " . $row['nombre'] . "</p>";
        echo "<button type='submit' name='estado' value='presente'>Presente</button>";
        echo "<button type='submit' name='estado' value='ausente'>Ausente</button>";
        echo "</form>";
    }
} else {
    echo "No hay alumnos registrados.";
}
?>
