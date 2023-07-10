<?php
    include 'conexion.php';
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location: ../index.html');
    }
    if (isset($_POST['id'])) {
        $id=$_POST['id'];
        $id = mysqli_real_escape_string($conn, $id);
        $id=intval($id);
        $sql="DELETE FROM curso WHERE id='$id'";
        $resultado=$conn->query($sql);
    }
?>