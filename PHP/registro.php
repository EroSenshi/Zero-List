<?php
include 'conexion.php';
session_start();
if (isset($_POST['nombre']) && isset($_POST['usuario']) && isset($_POST['password']) && isset($_POST['confirm_password'])) {
    $username = $_POST['nombre'];
    $unique_user = $_POST['usuario'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    // check if unique user exists
    $sql = "SELECT * FROM usuarios WHERE usuario='$unique_user'";
    $result = mysqli_query($conn, $sql);
    // if user exists, display error message
    if (mysqli_num_rows($result) > 0) {
        echo '<p>Error: This user already exists.</p>';
    } else {
        // check if passwords match
        if ($password != $confirm_password) {
            echo '<p>Error: Passwords do not match.</p>';
        } else {
            // insert user into database
            $sql = "INSERT INTO usuarios (nombre, usuario, password, tipoDeUsuario) VALUES ('$username', '$unique_user', '$password', 1)";
            mysqli_query($conn, $sql);
            // redirect to index.html
            header('Location: ../index.html');
        }
    }
    // close connection
    mysqli_close($conn);
}
?>