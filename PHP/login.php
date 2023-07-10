<?php
ob_start();
include 'conexion.php';
session_start();
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];
    // comprobar si el nombre de usuario y la contraseña existen en la base de datos
    $sql = "SELECT * FROM usuarios WHERE usuario='$username'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            $tipoDeUsuario = intval($row['tipoDeUsuario']);
            // si el usuario y contraseña son válidos, establecer variables de sesión
            $_SESSION['username'] = $username;
            $_SESSION['user_type'] = $tipoDeUsuario;
            $_SESSION['logged_in'] = true;
            // redirigir a la página de inicio a través de JavaScript después de 8 segundos
            echo '<script>
                setTimeout(function() {
                    window.location.href = "panel.php";
                }, 5000);
            </script>';
            exit();
        } else {
            // si la contraseña no coincide, mostrar mensaje de error y redireccionar después de 8 segundos
            ob_end_clean();
            echo '<p>Error: Nombre de usuario o contraseña incorrectos.</p>';
            echo '<script>
                setTimeout(function() {
                    window.location.href = "../index.html";
                }, 5000);
            </script>';
            exit();
        }
    } else {
        // si el usuario no existe, mostrar mensaje de error y redireccionar después de 8 segundos
        ob_end_clean();
        echo '<p>Error: Nombre de usuario o contraseña incorrectos.</p>';
        header('Location: panel.php');
        exit();
    }
    // cerrar la conexión
    mysqli_close($conn);
}
?>

