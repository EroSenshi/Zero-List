<?php
include 'conexion.php';
session_start();
if (isset($_POST['nombre']) && isset($_POST['usuario']) && isset($_POST['password']) && isset($_POST['confirm_password'])) {
    $username = $_POST['nombre'];
    $unique_user = $_POST['usuario'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    // checa que el usuario no exista
    $sql = "SELECT * FROM usuarios WHERE usuario='$unique_user'";
    $result = mysqli_query($conn, $sql);
    // Si el usuario existe da este mensaje de error
    if (mysqli_num_rows($result) > 0) {
        echo '<p>Error: This user already exists.</p>';
    } else {
        // checa que las contraseñas sean iguales
        if ($password != $confirm_password) {
            echo '<p>Error: Passwords do not match.</p>';
        } else {
            // Inserta los datos a la bd
            $sql = "INSERT INTO usuarios (nombre, usuario, password, tipoDeUsuario) VALUES ('$username', '$unique_user', '$password', 1)";
            mysqli_query($conn, $sql);
            // redirecciona a el index
            header('Location: ../index.html');
        }
    }
    // close connection
    mysqli_close($conn);
}
?>