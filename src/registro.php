<?php
include('../config/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreusuario = $_POST["nombreusuario"];
    $nombre = $_POST["nombre"];
    $tipo_usuario = $_POST["tipo_usuario"];
    $password = $_POST["password"];
    $confirmar_password = $_POST["confirmar_password"];

    // Verificar si el nombre de usuario ya existe en la base de datos
    $sql = "SELECT id FROM usuarios WHERE nombreusuario = '$nombreusuario'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "El nombre de usuario ya existe. Por favor, elige otro.";
    } elseif ($password !== $confirmar_password) {
        echo "Las contraseñas no coinciden. Inténtalo de nuevo.";
    } else {
        // Hash de la contraseña para mayor seguridad (puedes utilizar una función de hashing más segura)
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insertar el nuevo usuario en la base de datos
        $sql = "INSERT INTO usuarios (nombreusuario, nombre, tipo_usuario, password) VALUES ('$nombreusuario', '$nombre', '$tipo_usuario', '$hashed_password')";
        if ($conn->query($sql) === TRUE) {
            // Redireccionar a otra página después del registro
            header("Location: ../public/views/login.html");
            exit();
        } else {
            echo "Error al registrar el usuario: " . $conn->error;
        }
    }
}

?>
