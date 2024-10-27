// Import required modules
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Define the path where hashes will be stored
const integrityPath = path.join(__dirname, '../data/integrity');

/**
 * Generates a SHA-256 hash for a given data object.
 * @param {Object} data - The data object to hash.
 * @returns {string} - The generated hash as a hexadecimal string.
 */
exports.generateHash = (data) => {
    try {
        // Convert the data to a string format
        const dataString = JSON.stringify(data);

        // Create a SHA-256 hash of the data
        const hash = crypto.createHash('sha256').update(dataString).digest('hex');
        return hash;
    } catch (error) {
        console.error(`Error generating hash: ${error.message}`);
        throw error;
    }
};

/**
 * Saves the hash to a file for later verification.
 * @param {string} fileName - The name of the file to save the hash (e.g., 'documents.hash').
 * @param {string} hash - The hash string to save.
 */
exports.saveHash = (fileName, hash) => {
    try {
        // Ensure the integrity directory exists
        if (!fs.existsSync(integrityPath)) {
            fs.mkdirSync(integrityPath, { recursive: true });
        }

        // Write the hash to the specified file
        const filePath = path.join(integrityPath, fileName);
        fs.writeFileSync(filePath, hash, 'utf8');
    } catch (error) {
        console.error(`Error saving hash to file: ${error.message}`);
        throw error;
    }
};

/**
 * Verifies the integrity of a given data object by comparing its hash with the stored hash.
 * @param {string} fileName - The name of the file where the hash is stored (e.g., 'documents.hash').
 * @param {Object} data - The data object to verify.
 * @returns {boolean} - Returns true if the hash matches, false otherwise.
 */
exports.verifyHash = (fileName, data) => {
    try {
        // Generate the hash for the given data
        const currentHash = exports.generateHash(data);

        // Read the stored hash from the file
        const filePath = path.join(integrityPath, fileName);
        if (!fs.existsSync(filePath)) {
            console.error(`Hash file not found: ${fileName}`);
            return false;
        }
        const storedHash = fs.readFileSync(filePath, 'utf8');

        // Compare the stored hash with the generated hash
        if (storedHash === currentHash) {
            return true;
        } else {
            console.warn(`Data integrity check failed for file: ${fileName}`);
            return false;
        }
    } catch (error) {
        console.error(`Error verifying hash: ${error.message}`);
        throw error;
    }
};

/**
 * Alerts the system if tampering or corruption is detected.
 * This function can be extended to include logging or notification mechanisms.
 * @param {string} fileName - The name of the file where tampering was detected.
 */
exports.alertTampering = (fileName) => {
    console.error(`Data integrity alert: Tampering or corruption detected in file: ${fileName}`);
    // Additional alert mechanisms can be added here (e.g., sending an email, logging to an external system, etc.)
};
