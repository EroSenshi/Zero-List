<?php
include('../config/db.php');

// Obtener los datos del formulario
$usuario = $_POST['usuario'];
$password = $_POST['password'];

// Consulta SQL para obtener la contraseña hasheada y el ID del usuario
$sql = "SELECT nombreusuario, password, id FROM usuarios WHERE nombreusuario='$usuario'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['password'];

    // Verificar la contraseña ingresada con la contraseña hasheada
    if (password_verify($password, $hashed_password)) {
        echo "Inicio de sesión exitoso.";

        // Crear una cookie con el ID del usuario
        $id = $row['id'];
        setcookie("user_id", $id, time() + 3600, "/"); // La cookie expirará en 1 hora

        header("Location: ../public/views/index.html");
        exit();
    } else {
        echo "Nombre de usuario o contraseña incorrectos.";
    }
} else {
    echo "Nombre de usuario o contraseña incorrectos.";
}

$conn->close();
?>
