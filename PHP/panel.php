<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../CSS/style2.css">
    <link rel="icon" href="../miweb/logo.ico">

    <title>Cursos</title>
</head>
<header>
    <img src="../miweb/img.ico">
    <h1>Zero-List</h1>

    <form id="right" action="logout.php" method="post">
        <input class="button" type="submit" value="Cerrar Sesion">
    </form>

    <div id="mid">
        <?php if ($_SESSION['user_type'] == 0) { ?>
            <button class="button" onclick="window.location.href='add_course.php'">Agregar curso</button>
            <button class="button" onclick="window.location.href='edit_course.php'">Editar curso</button>
            <button class="button" onclick="deleteCourse()">Eliminar curso</button>
        <?php } else { ?>
            <button class="button" onclick="window.location.href='listas.php'">Listas</button>
        <?php } ?>
    </div>
</header>
<body>
    <?php
    include 'conexion.php';
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location: ../index.html');
    }
    $sql = "SELECT * FROM curso";
    $result = mysqli_query($conn, $sql);
    
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<section class="container">';
        echo '<form action="listas.php" method="post">';
        echo '<div class="tarjeta">';
        echo '<h3>' . $row['nombreCurso'] . '</h3>';
        echo '<p>ID: ' . $row['id'] . '</p>';
        echo '<input type="hidden" name="curso_id" value="' . $row['id'] . '">';
        echo '<input id="ver" type="submit" value="Ver detalles">';
        echo '</div>';
        echo '</form>';
        echo '</section>';
    }
    
    mysqli_close($conn);
    ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
    function deleteCourse() {
        var id = prompt('Ingresa el ID del curso a eliminar:');

        if (id) { // Verificar si se ingresó un valor
            if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
                // Eliminar el curso de la base de datos
                $.ajax({
                    url: 'delete_course.php',
                    type: 'POST',
                    data: {
                        id: id
                    },
                    success: function(response) {
                        if (response == 'success') {
                            // Recargar la página
                            location.reload();
                        }
                    }
                });
            }
        }
    }
    </script>
</body>
<footer>
    <div id="contac">
        <a href="mailto:damzerotec@gmail.com" target="_blank">Contactarme</a>
    </div>
    <p>
        Copyright 2023 By Zero-Software ©
    </p>
</footer>
</html>
