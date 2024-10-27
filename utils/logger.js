const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Define log directory and log file path
const logDirectory = path.join(__dirname, '../logs');
const logFilePath = path.join(logDirectory, 'application.log');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info',  // Set default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // Console log
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        // File log
        new winston.transports.File({ filename: logFilePath })
    ],
});

/**
 * Log an informational message.
 * @param {string} message - The message to log.
 */
exports.info = (message) => {
    logger.info(message);
};

/**
 * Log a warning message.
 * @param {string} message - The message to log.
 */
exports.warn = (message) => {
    logger.warn(message);
};

/**
 * Log an error message.
 * @param {string} message - The message to log.
 */
exports.error = (message) => {
    logger.error(message);
};

/**
 * Log an audit message for tracking important events.
 * @param {string} message - The audit message to log.
 */
exports.audit = (message) => {
    // Customize the log level for audit if needed; using 'info' as an example
    logger.info(`AUDIT: ${message}`);
};

/**
 * Log debugging details.
 * @param {string} message - The debug message to log.
 */
exports.debug = (message) => {
    logger.debug(message);
};
