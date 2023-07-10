<?php
include 'conexion.php';
session_start();
if (isset($_POST['nombre']) && isset($_POST['usuario']) && isset($_POST['password']) && isset($_POST['confirm_password'])) {
    $username = $_POST['nombre'];
    $unique_user = $_POST['usuario'];
    $userType = intval($_POST['userType']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // check if unique user exists using a prepared statement
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $unique_user);
    $stmt->execute();
    $result = $stmt->get_result();

    // if user exists, display error message and redirect to registro.html
    if ($result->num_rows > 0) {
        echo '<p>Error: El usuario ya existe, elija otro.</p>';
        echo '<script>
                setTimeout(function() {
                    window.location.href = "../registro.html";
                }, 3000);
            </script>';
        exit();
    } else {
        // check if passwords match
        if ($password != $confirm_password) {
            echo '<p>Error: Las contraseñas no coinciden.</p>';
            echo '<script>
                setTimeout(function() {
                    window.location.href = "../registro.html";
                }, 3000);
            </script>';
            exit();
        } else {
            // hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // insert user into database using a prepared statement
            $stmt = $conn->prepare("INSERT INTO usuarios (nombre, usuario, password, tipoDeUsuario) VALUES (?, ?, ?, 1)");
            $stmt->bind_param("sss", $username, $unique_user, $hashedPassword);
            $stmt->execute();

            // redirect to index.html
            echo '<script>
                setTimeout(function() {
                    window.location.href = "../index.html";
                }, 500);
            </script>';
            exit();
        }
    }

    // close statement and connection
    $stmt->close();
    $conn->close();
}
?>
