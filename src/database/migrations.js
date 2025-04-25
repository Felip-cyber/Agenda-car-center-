const fs = require('fs');
const path = require('path');
const pool = require('../../config/database');

async function runMigrations() {
  try {
    const sqlFile = fs.readFileSync(
      path.join(__dirname, '../../style/Basedatos.sql'),
      'utf8'
    );
    
    const connection = await pool.getConnection();
    await connection.query(sqlFile);
    console.log('Migraciones ejecutadas correctamente');
    connection.release();
  } catch (error) {
    console.error('Error al ejecutar las migraciones:', error);
  }
}

module.exports = { runMigrations };