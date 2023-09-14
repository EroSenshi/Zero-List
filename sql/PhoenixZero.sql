CREATE DATABASE IF NOT EXISTS `phoenixzero`;
USE `phoenixzero`;

CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombreDeUsuario` VARCHAR(255) NOT NULL,
  `tipoDeUsuario` ENUM('0', '1') NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cursos` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombreDeCurso` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `asistencias` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `idUsuario` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `estado` ENUM('P', 'A') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

