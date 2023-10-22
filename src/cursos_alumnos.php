<?php

$sql = "SELECT cursos.id, cursos.nombre_curso FROM cursos
    JOIN cursos_alumnos ON cursos.id = cursos_alumnos.id_curso
    WHERE cursos_alumnos.id_alumno = $user_id";

$result = mysqli_query($conn, $sql);

// Verifica si hay resultados
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<section class="container">';
        echo '<form action="listas.php" method="post">';
        echo '<div class="tarjeta">';
        echo '<h3>' . $row['nombre_curso'] . '</h3>';
        echo '<p>ID: ' . $row['id'] . '</p>';
        echo '<input type="hidden" name="curso_id" value="' . $row['id'] . '">';
        echo '<input id="ver" type="submit" value="Ver detalles">';
        echo '<a href="delete_union.php?id=' . $row['id'] . '" class="boton">Salir del curso</a>';
        echo '</div>';
        echo '</form>';
        echo '</section>';
    }
} else {
    echo "No se encontraron cursos para este usuario.";
}

// Cierra la conexión a la base de datos
mysqli_close($conn);

?>
