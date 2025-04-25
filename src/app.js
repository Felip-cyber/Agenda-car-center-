/**
 * @fileoverview Car Center - Sistema de Gestión de Lavado de Autos
 * @copyright Felipe Ramirez 2025
 * @version 1.0.0
 *
 * Este archivo está protegido por derechos de autor.
 * Todos los derechos reservados.
 */

try {
  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const errorHandler = require("./middleware/errorHandler");
  require("dotenv").config();

  const app = express();

  // Middleware básico
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configuración de rutas estáticas
  app.use(express.static(path.join(__dirname, "public")));

  // Verificación de conexión a la base de datos
  const pool = require("../config/database");
  pool
    .getConnection()
    .then((connection) => {
      console.log("✅ Conexión a la base de datos establecida");
      connection.release();
    })
    .catch((error) => {
      console.error("❌ Error conectando a la base de datos:", error.message);
      process.exit(1);
    });

  // Importar rutas
  const citasRoutes = require("./routes/citas.routes");

  // Rutas básicas
  app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  app.get("/", (req, res) => {
    res.json({
      message: "Bienvenido a la API de Car Center",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        docs: "/api-docs",
      },
    });
  });

  // Usar rutas
  app.use("/api/citas", citasRoutes);

  // Manejador de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Error interno del servidor",
      message: process.env.NODE_ENV === "development" ? err.message : null,
    });
  });

  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`✅ Servidor iniciado en: http://localhost:${PORT}`);
    console.log(
      `📝 Documentación disponible en: http://localhost:${PORT}/api-docs`
    );
  });

  // Manejo de errores del servidor
  server.on("error", (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

    switch (error.code) {
      case "EACCES":
        console.error(`❌ ${bind} requiere privilegios elevados`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`❌ ${bind} ya está en uso`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  });

  module.exports = app;
} catch (error) {
  console.error("❌ Error al cargar las dependencias:", error);
  process.exit(1);
}
