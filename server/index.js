const express = require('express');
const app = express();

// Verificación de Node.js
console.log('✅ Versión de Node.js:', process.version);
console.log('✅ Información del sistema:');
console.log('   - Plataforma:', process.platform);
console.log('   - Arquitectura:', process.arch);
console.log('   - Memoria total:', Math.round(process.memoryUsage().heapTotal / 1024 / 1024), 'MB');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Manejo de errores mejorado
process.on('uncaughtException', (error) => {
  console.error('[Error Fatal]:', error);
  process.exit(1);
});

// Configuración básica
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Verificación de estado
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// Inicio del servidor mejorado
let server;
try {
  server = app.listen(PORT, HOST, () => {
    console.log(`✅ Servidor funcionando en http://${HOST}:${PORT}`);
    console.log(`📝 Modo: ${process.env.NODE_ENV || 'development'}`);
  });
} catch (error) {
  console.error('❌ Error al iniciar servidor:', error);
  process.exit(1);
}

// Manejo de señales
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  console.log('🔄 Cerrando servidor...');
  server.close(() => {
    console.log('👋 Servidor cerrado exitosamente');
    process.exit(0);
  });
}