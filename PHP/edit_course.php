<?php
    include 'conexion.php';
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location: ../index.html');
    }
    if (isset($_POST['id']) && isset($_POST['nombre'])){
        $nombre = $_POST['nombre'];
        $id = $_POST['id'];
        $sql = "UPDATE curso SET nombreCurso = '$nombre' WHERE id = '$id'";
        $resultado=$conn->query($sql);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="post">
        <input type="text" name="id" placeholder="Inserte el id">
        <input type="text" name="nombre" placeholder="Inserte el nuevo nombre" >
    </form>
</body>
</html>