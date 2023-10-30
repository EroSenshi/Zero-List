<?php
include('../config/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreusuario = $_POST["nombreusuario"];
    $nombre = $_POST["nombre"];
    $tipo_usuario = $_POST["tipo_usuario"];
    $password = $_POST["password"];
    $confirmar_password = $_POST["confirmar_password"];

    $errores = array(); // Crear un array para almacenar los errores

    // Validar el nombre de usuario
    if (empty($nombreusuario)) {
        $errores[] = "El nombre de usuario es obligatorio.";
    }

    // Validar el nombre
    if (empty($nombre)) {
        $errores[] = "El nombre es obligatorio.";
    }

    // Validar el tipo de usuario
    if (empty($tipo_usuario)) {
        $errores[] = "El tipo de usuario es obligatorio.";
    }

    // Validar la contraseña
    if (strlen($password) < 8 || !preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/", $password)) {
        $errores[] = "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un símbolo.";
    }

    // Verificar si las contraseñas coinciden
    if ($password !== $confirmar_password) {
        $errores[] = "Las contraseñas no coinciden. Inténtalo de nuevo.";
    }

    // Verificar si hay errores
    if (empty($errores)) {
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
    } else {
        // Mostrar los errores al usuario
        foreach ($errores as $error) {
            echo $error . "<br>";
        }
    }
}
?>
