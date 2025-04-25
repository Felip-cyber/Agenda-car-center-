DROP DATABASE IF EXISTS car_center;
CREATE DATABASE car_center;
USE car_center;

-- Tabla de empleados
CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);

-- Tabla de servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL
);

-- Tabla de citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    empleado_id INT,
    fecha DATETIME NOT NULL,
    estado ENUM('pendiente', 'en_proceso', 'completada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Relación entre citas y servicios
CREATE TABLE cita_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT,
    servicio_id INT,
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE
);

-- Tabla de facturas
CREATE TABLE facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT,
    fecha_emision DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE
);

-- Detalle de la factura (servicios facturados)
CREATE TABLE detalle_factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    factura_id INT,
    servicio_id INT,
    cantidad INT DEFAULT 1,
    precio_unitario DECIMAL(10, 2),
    FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);

-- Tabla de vehículos
CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    año INT NOT NULL,
    placa VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabla de inventario
CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    cantidad INT DEFAULT 0,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    proveedor VARCHAR(100)
);

-- Tabla de proveedores
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100)
);

-- Tabla de órdenes de compra
CREATE TABLE ordenes_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'completada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

-- Detalle de la orden de compra (productos comprados)
CREATE TABLE detalle_orden_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_compra_id INT,
    producto_id INT,
    cantidad INT DEFAULT 1,
    precio_unitario DECIMAL(10, 2),
    FOREIGN KEY (orden_compra_id) REFERENCES ordenes_compra(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES inventario(id)
);

-- Tabla de pagos
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    factura_id INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10, 2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
    FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE CASCADE
);

-- Tabla de auditoría
CREATE TABLE auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion ENUM('crear', 'actualizar', 'eliminar') NOT NULL,
    tabla VARCHAR(100) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES empleados(id)
);

-- Agregar índices para mejorar el rendimiento
ALTER TABLE citas ADD INDEX idx_fecha (fecha);
ALTER TABLE facturas ADD INDEX idx_fecha_emision (fecha_emision);
ALTER TABLE vehiculos ADD INDEX idx_placa (placa);
ALTER TABLE inventario ADD INDEX idx_nombre_producto (nombre_producto);

-- Agregar restricciones de validación
ALTER TABLE empleados
ADD CONSTRAINT chk_telefono_empleado CHECK (telefono REGEXP '^[0-9]{10}$');

ALTER TABLE clientes
ADD CONSTRAINT chk_correo_cliente CHECK (correo REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE vehiculos
ADD CONSTRAINT chk_placa CHECK (placa REGEXP '^[A-Z]{3}[0-9]{3}$');