<?php
include('../config/db.php');
// Obtener el ID del curso a eliminar
$curso_id = $_GET["id"];
$user_id = $_COOKIE["user_id"];
// Iniciar una transacción para asegurarse de que ambas eliminaciones se realicen correctamente
$conn->begin_transaction();

// Consulta SQL para eliminar el curso
$sqlEliminarCurso = "DELETE FROM cursos_alumnos WHERE id_curso = $curso_id";
$sqlEliminarAsistencia = "DELETE FROM asistencia WHERE alumno_id = $user_id";

try {
    // Eliminar los alumnos del curso

    // Eliminar el curso
    $conn->query($sqlEliminarCurso);
    $conn->query($sqlEliminarAsistencia);
    // Confirmar la transacción
    $conn->commit();

    echo "Curso y alumnos eliminados correctamente.";
    header("Location: paneles/cursos_alumnos.php");
    exit;
} catch (Exception $e) {
    // Revertir la transacción en caso de error
    $conn->rollback();

    echo "Error al eliminar el curso y los alumnos: " . $e->getMessage();
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
