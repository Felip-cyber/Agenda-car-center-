const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`❌ Error: ${err.message}`);
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;