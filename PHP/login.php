<?php
include 'conexion.php';
session_start();
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    // comprobar si el nombre de usuario y la contraseña existen en la base de datos
    $sql = "SELECT * FROM usuarios WHERE usuario='$username' AND password='$password'";
    $result = mysqli_query($conn, $sql);
    $sqType=mysqli_query($conn, "SELECT tipoDeUsuario FROM usuarios WHERE usuario = 'username'");
    $tipoDeUsuario=$sqlType['tipoDeUsuario'];
    // si el usuario existe, establecer variables de sesión y redirigir a la página de inicio
    if (mysqli_num_rows($result) > 0) {
        $_SESSION['username'] = $username;
        $_SESSION['user_type'] = $tipoDeUsuario;
        $_SESSION['logged_in'] = true;
        header('Location: panel.php');
    } else {
        // si el usuario no existe, mostrar mensaje de error
        echo '<p>Error: Nombre de usuario o contraseña incorrectos.</p>';
    }
    // cerrar la conexión
    mysqli_close($conn);
}
?>