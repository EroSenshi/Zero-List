<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "";
$password = "";
$database = "Nose";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos del formulario
$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];

// Consulta SQL para verificar el inicio de sesión
$sql = "SELECT * FROM usuarios WHERE usuario='$usuario' AND contraseña='$contraseña'";
$result = $conn->query($sql);

//Esto sirve para redireccionar si esta todo correcto
if ($result->num_rows == 1) {
    echo "Inicio de sesión exitoso.";
} else {
    echo "Nombre de usuario o contraseña incorrectos.";
}

$conn->close();
?>