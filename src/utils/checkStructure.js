const fs = require('fs');
const path = require('path');

const requiredPaths = [
    '/src',
    '/src/routes',
    '/src/controllers',
    '/src/models',
    '/src/middleware',
    '/config',
    '/style'
];

function checkAndCreateStructure() {
    const baseDir = path.resolve(__dirname, '../..');
    
    requiredPaths.forEach(dir => {
        const fullPath = path.join(baseDir, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`✅ Creado directorio: ${dir}`);
        }
    });
}

checkAndCreateStructure();