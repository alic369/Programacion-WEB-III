CREATE DATABASE basededatos;
USE basededatos;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT current_timestamp(),
    updatedAt DATETIME NOT NULL DEFAULT current_timestamp() 
);

INSERT INTO categorias (nombre, descripcion) VALUES
('Electrónica', 'Dispositivos electrónicos y gadgets'), 
('Oficina', 'Material y accesorios de oficina');

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2),
  categoria_id INT,
  createdAt DATETIME NOT NULL DEFAULT current_timestamp(),
  updatedAt DATETIME NOT NULL DEFAULT current_timestamp(),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO productos (nombre, precio, categoria_id) VALUES
  ('Laptop', 1500.00, 1),
  ('Mouse', 25.00, 1),
  ('Escritorio', 200.00, 2),
  ('Silla', 165.00, 2),
  ('Monitor', 350.50, 1);