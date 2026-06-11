CREATE DATABASE bdRefrain;

USE bdRefrain;

CREATE TABLE usuario ( 
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('dueno','empleado') NOT NULL DEFAULT 'empleado',
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
    );
    
CREATE TABLE categoria (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id) );
    
CREATE TABLE producto (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    categoria_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id)
    );
    
CREATE TABLE cliente (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(30),
    PRIMARY KEY (id)
    );
    
CREATE TABLE venta (
    id INT NOT NULL AUTO_INCREMENT,
    cliente_id INT NULL,
    usuario_id INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT current_timestamp(),
    cancelada BOOLEAN NOT NULL DEFAULT FALSE,
    total DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_venta_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_venta_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
    );
    
CREATE TABLE detalle_venta (
    id INT NOT NULL AUTO_INCREMENT,
    venta_id INT NOT NULL, 
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detalle_venta
        FOREIGN KEY (venta_id)
        REFERENCES venta(id),
    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (producto_id)
        REFERENCES producto(id) 
    );


    ____
    A implementar

    CREATE TABLE proveedor (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    PRIMARY KEY (id)
    );
    