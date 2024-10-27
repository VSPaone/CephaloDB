const dotenv = require('dotenv');
const { app, server } = require('./app');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Load environment-specific configurations
const environment = process.env.NODE_ENV || 'development';
logger.info(`Running in ${environment} mode`);

// Check if the application is running inside Docker
const isDocker = process.env.IS_DOCKER || false;

// Load custom configurations based on the environment
const config = require(`./config/env.${environment}.js`);

// Apply any additional environment-specific settings if needed
const PORT = process.env.PORT || config.port || 3000;
const HOST = isDocker ? '0.0.0.0' : config.host || 'localhost';

// Listen on the specified port
server.listen(PORT, HOST, () => {
    logger.info(`Server is running at http://${HOST}:${PORT}`);
});

// Graceful shutdown handling
const shutdown = () => {
    logger.info('Shutting down server...');
    server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
