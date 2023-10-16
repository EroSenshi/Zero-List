<?php
include('../../config/db.php');

// Obtener el ID del curso a eliminar
$curso_id = $_GET["id"];

// Iniciar una transacción para asegurarse de que todas las eliminaciones se realicen correctamente
$conn->begin_transaction();

try {

    // Consulta SQL para eliminar las relaciones entre alumnos y cursos
    $sqlEliminarRelaciones = "DELETE FROM cursos_alumnos WHERE id_curso = $curso_id";
    $conn->query($sqlEliminarRelaciones);

    // Consulta SQL para eliminar el curso
    $sqlEliminarCurso = "DELETE FROM cursos WHERE id = $curso_id";
    $conn->query($sqlEliminarCurso);

    // Confirmar la transacción
    $conn->commit();

    echo "Curso, alumnos y asistencias eliminados correctamente.";
    header("Location: mostrar_cursos.php");
    exit;
} catch (Exception $e) {
    // Revertir la transacción en caso de error
    $conn->rollback();

    echo "Error al eliminar el curso, los alumnos y las asistencias: " . $e->getMessage();
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
