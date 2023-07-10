<?php
    include 'conexion.php';
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location: ../index.html');
    }
    if (isset($_POST['id']) && isset($_POST['nombre'])){
    $nombre = $_POST['nombre'];
    $id = intval($_POST['id']); // Convertir a entero
    $nombre = mysqli_real_escape_string($conn, $nombre);
    $sql = "UPDATE curso SET nombreCurso = '$nombre' WHERE id = $id"; // No se necesitan comillas para el campo entero
    // echo $sql;
    $resultado = $conn->query($sql);
    header('Location: panel.php');
    exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Curso</title>
</head>
<body>
    <form method="post">
        <input type="text" name="id" placeholder="Inserte el id">
        <input type="text" name="nombre" placeholder="Inserte el nuevo nombre" >
        <input type="submit" value="Editar">
    </form>
</body>
</html>
</body>
</html>