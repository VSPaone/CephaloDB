const encryptionService = require('../services/encryptionService');
const keyManager = require('../utils/keyManager');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Middleware to decrypt data when a file is accessed.
 * This middleware reads the encrypted file, decrypts its content, and attaches the
 * decrypted data to the request object for use in controllers or services.
 * @param {string} filePath - The path to the JSON file to decrypt.
 */
exports.decryptFile = (filePath) => {
    return (req, res, next) => {
        try {
            // Retrieve the current encryption key
            const key = keyManager.getCurrentKey();

            // Check if the file exists before attempting to decrypt
            if (fs.existsSync(filePath)) {
                const encryptedData = fs.readFileSync(filePath, 'utf8');
                const decryptedData = encryptionService.decryptData(encryptedData, key);

                // Attach the decrypted data to the request object for use in the controller
                req.decryptedData = JSON.parse(decryptedData);
                logger.info(`File at ${filePath} decrypted successfully.`);
            } else {
                req.decryptedData = null;
                logger.warn(`File at ${filePath} does not exist.`);
            }

            next();
        } catch (error) {
            logger.error(`Error decrypting file at ${filePath}: ${error.message}`);
            res.status(500).json({ error: 'Error accessing the file. Please try again later.' });
        }
    };
};

/**
 * Middleware to encrypt data before a file is saved.
 * This middleware encrypts the outgoing data in the response object and writes it
 * to the specified file path, ensuring that all data saved to disk is secure.
 * @param {string} filePath - The path where the JSON file will be saved.
 */
exports.encryptFile = (filePath) => {
    return (req, res, next) => {
        try {
            // Retrieve the current encryption key
            const key = keyManager.getCurrentKey();

            // Get the data from the request to be encrypted and saved
            const dataToEncrypt = req.body;
            if (!dataToEncrypt) {
                logger.warn('No data provided to save.');
                return res.status(400).json({ error: 'No data provided to save.' });
            }

            // Convert the data to a JSON string and encrypt it
            const jsonString = JSON.stringify(dataToEncrypt);
            const encryptedData = encryptionService.encryptData(jsonString, key);

            // Write the encrypted data to the specified file path
            fs.writeFileSync(filePath, encryptedData, 'utf8');
            logger.info(`File at ${filePath} encrypted and saved successfully.`);

            next();
        } catch (error) {
            logger.error(`Error encrypting file at ${filePath}: ${error.message}`);
            res.status(500).json({ error: 'Error saving the file. Please try again later.' });
        }
    };
};
