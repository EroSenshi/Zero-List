<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cursos</title>
</head>
<body>
    <?php
    include 'conexion.php';
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location: ../index.html');
    }
    $sql = "SELECT * FROM curso";
    $result = mysqli_query($conn, $sql);
    // Crear tabla para mostrar los cursos
    echo '<table>';
    echo '<tr>';
    echo '<th>Nombre del curso</th>';
    echo '<th>ID</th>';
    echo '</tr>';
    // Iterar a través de los cursos y agregarlos a la tabla
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<tr>';
        echo '<td>' . $row['nombre'] . '</td>';
        echo '<td>' . $row['id'] . '</td>';
        echo '</tr>';
    }
    echo $_SESSION['username'];
    echo $_SESSION['user_type'];
    // Cerrar la conexión
    mysqli_close($conn);
    ?>
    <form action="logout.php" method="post">
        <input type="submit" value="Logout">
    </form>
    <button onclick="window.location.href='listas.php'">Listas</button>
    <?php if ($_SESSION['user_type'] == 0) { ?>
        <button onclick="window.location.href='add_course.php'">Agregar curso</button>
        <button onclick="window.location.href='edit_course.php'">Editar curso</button>
        <button onclick="deleteCourse(id)">Eliminar curso</button>
    <?php } else { ?>
        <button onclick="window.location.href='listas.php'">Listas</button>
    <?php } ?>
    <script>
        function deleteCourse(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
                // Eliminar el curso de la base de datos
                $.ajax({
                    url: 'delete_course.php',
                    type: 'POST',
                    data: {
                        id: id
                    },
                    success: function (response) {
                        if (response == 'success') {
                            // Recargar la página
                            location.reload();
                        }
                    }
                });
            }
        }
    </script>
</body>
</html>