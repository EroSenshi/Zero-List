<?php
    include 'conexion.php';
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location: ../index.html');
    }
    if (isset($_POST['nombre'])){
        $nombre=$_POST['nombre'];
        //consulta sql para grabar el curso en la base de datos
        $sql="INSERT INTO curso (nombreCurso) VALUES ('$nombre')";
        $result=mysqli_query($conn, $sql);
        //redireccion a la pagina del panel
        header('Location: panel.php');
        exit();
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir cursos</title>
</head>
<body>
    <form method="post">
        <label for="nombre">Nombre del curso</label>
        <input type="text" name="nombre" id="nombre" required>
        <input type="submit" value="Añadir">
    </form>
</body>
</html>