// Import required modules
const crypto = require('crypto');
const keyManager = require('../utils/keyManager');

// Define encryption algorithm and settings
const algorithm = 'aes-256-cbc';
const ivLength = 16; // IV length for AES-256

/**
 * Encrypts the provided data using AES-256.
 * @param {Object} data - The data to encrypt.
 * @returns {string} - The encrypted data as a string.
 */
exports.encryptData = (data) => {
    try {
        // Retrieve the encryption key from keyManager
        const key = keyManager.getEncryptionKey();

        // Generate a random initialization vector (IV)
        const iv = crypto.randomBytes(ivLength);

        // Create a cipher instance
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);

        // Convert data to string and encrypt
        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Return the IV and encrypted data as a combined string
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error(`Error encrypting data: ${error.message}`);
        throw error;
    }
};

/**
 * Decrypts the provided encrypted data using AES-256.
 * @param {string} encryptedData - The encrypted data as a string.
 * @returns {Object} - The decrypted data as an object.
 */
exports.decryptData = (encryptedData) => {
    try {
        // Retrieve the encryption key from keyManager
        const key = keyManager.getEncryptionKey();

        // Split the IV and encrypted data
        const [ivString, encrypted] = encryptedData.split(':');
        const iv = Buffer.from(ivString, 'hex');

        // Create a decipher instance
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);

        // Decrypt the data
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        // Parse and return the JSON data
        return JSON.parse(decrypted);
    } catch (error) {
        console.error(`Error decrypting data: ${error.message}`);
        throw error;
    }
};
