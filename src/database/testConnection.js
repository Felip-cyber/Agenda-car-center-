const pool = require('../../config/database');

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión exitosa a la base de datos');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

testConnection();