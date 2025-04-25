// Configuración de la base de datos
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    debug: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: true
    } : false
});

// Función para probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a la base de datos establecida');
        
        // Verificar que la base de datos existe
        const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
        if (databases.length === 0) {
            throw new Error(`La base de datos ${process.env.DB_NAME} no existe`);
        }
        
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error.message);
        return false;
    }
};

module.exports = { pool, testConnection };