CREATE TABLE asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_curso INT NOT NULL,
    fecha_hora DATETIME NOT NULL
);
