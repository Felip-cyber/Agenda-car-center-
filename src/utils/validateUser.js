const mysql = require('mysql2/promise');
require('dotenv').config();

async function validateUserPrivileges() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Validar usuario y plugin
        const [userInfo] = await connection.query(
            'SELECT user, host, plugin FROM mysql.user WHERE user = ?',
            [process.env.DB_USER]
        );
        console.log('✅ Información del usuario:', userInfo);

        // Validar privilegios
        const [privileges] = await connection.query(
            'SHOW GRANTS FOR ?@?',
            [process.env.DB_USER, process.env.DB_HOST]
        );
        console.log('✅ Privilegios del usuario:', privileges);

        await connection.end();
    } catch (error) {
        console.error('❌ Error validando usuario:', error.message);
    }
}

validateUserPrivileges();