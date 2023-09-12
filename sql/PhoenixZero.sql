CREATE DATABASE IF NOT EXISTS phoenixzero;

USE phoenixzero;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombreDeUsuario VARCHAR(255) NOT NULL,
  tipoDeUsuario ENUM('0', '1') NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombreDeCurso VARCHAR(255) NOT NULL
);

-- Tabla de asistencias
CREATE TABLE IF NOT EXISTS asistencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  fecha DATE NOT NULL,
  estado ENUM('P', 'A') NOT NULL,
  UNIQUE KEY unique_idUsuario (idUsuario),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
  CHECK (tipoDeUsuario = '1')
);
