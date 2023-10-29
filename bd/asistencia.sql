CREATE TABLE asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT,
    fecha_hora DATETIME,
    estado VARCHAR(255),
    curso_id INT
);
