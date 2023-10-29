<?php
include('../config/db.php');

// Obtener el ID del curso a eliminar
$curso_id = $_GET["id"];

// Iniciar una transacción para asegurarse de que ambas eliminaciones se realicen correctamente
$conn->begin_transaction();

try {
    // Consulta SQL para eliminar los datos de la tabla asistencia relacionados con el curso_id
    $sqlEliminarAsistencia = "DELETE FROM asistencia WHERE curso_id = $curso_id";

    // Consulta SQL para eliminar los datos de la tabla cursos_alumnos relacionados con el id_curso
    $sqlEliminarCursosAlumnos = "DELETE FROM cursos_alumnos WHERE id_curso = $curso_id";

    // Ejecutar las consultas para eliminar los datos de las tablas relacionadas
    $conn->query($sqlEliminarAsistencia);
    $conn->query($sqlEliminarCursosAlumnos);

    // Consulta SQL para eliminar el curso
    $sqlEliminarCurso = "DELETE FROM cursos WHERE id = $curso_id";

    // Ejecutar la consulta para eliminar el curso
    $conn->query($sqlEliminarCurso);

    // Confirmar la transacción
    $conn->commit();

    echo "Curso, alumnos y asistencias eliminados correctamente.";
    header("Location: paneles/mostrar_cursos.php");
    exit;
} catch (Exception $e) {
    // Revertir la transacción en caso de error
    $conn->rollback();

    echo "Error al eliminar el curso, alumnos y asistencias: " . $e->getMessage();
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
