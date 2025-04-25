const { pool } = require('../../config/database');

async function validateDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a la base de datos exitosa');
        
        // Validar la base de datos
        const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
        if (databases.length === 0) {
            throw new Error(`Base de datos ${process.env.DB_NAME} no existe`);
        }
        console.log(`✅ Base de datos ${process.env.DB_NAME} encontrada`);
        
        // Validar tablas
        await connection.changeUser({ database: process.env.DB_NAME });
        const [tables] = await connection.query('SHOW TABLES');
        console.log('✅ Tablas encontradas:', tables.length);
        
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error en la validación:', error.message);
        return false;
    }
}

validateDatabaseConnection();