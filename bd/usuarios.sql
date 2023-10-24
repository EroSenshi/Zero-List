CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreusuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL
);
