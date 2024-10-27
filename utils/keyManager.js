const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Directory and file paths for storing encryption keys
const keysDirectory = path.join(__dirname, '../keys');
const keyFilePath = path.join(keysDirectory, 'encryption.key');

// Configuration for key management
const KEY_SIZE = 32; // AES-256 requires a 256-bit key (32 bytes)
const ROTATION_INTERVAL_DAYS = 90; // Rotate keys every 90 days

// Ensure keys directory exists
if (!fs.existsSync(keysDirectory)) {
    fs.mkdirSync(keysDirectory, { recursive: true });
}

/**
 * Generates a new encryption key.
 * @returns {Buffer} - The generated encryption key.
 */
const generateKey = () => {
    return crypto.randomBytes(KEY_SIZE);
};

/**
 * Saves the encryption key to the file system.
 * @param {Buffer} key - The encryption key to save.
 */
const saveKey = (key) => {
    fs.writeFileSync(keyFilePath, key.toString('hex'), 'utf8');
};

/**
 * Retrieves the current encryption key from the file system.
 * If no key exists, generates a new one and saves it.
 * @returns {Buffer} - The retrieved or newly generated encryption key.
 */
exports.getCurrentKey = () => {
    if (!fs.existsSync(keyFilePath)) {
        console.log('No encryption key found. Generating a new one.');
        const newKey = generateKey();
        saveKey(newKey);
        return newKey;
    }
    const keyHex = fs.readFileSync(keyFilePath, 'utf8');
    return Buffer.from(keyHex, 'hex');
};

/**
 * Rotates the encryption key by generating a new one and saving it.
 * Old keys can be archived or logged for security purposes if needed.
 * @returns {Buffer} - The new encryption key.
 */
exports.rotateKey = () => {
    console.log('Rotating encryption key...');
    const newKey = generateKey();
    saveKey(newKey);
    console.log('Encryption key rotated successfully.');
    return newKey;
};

/**
 * Checks if the encryption key needs to be rotated based on the rotation interval.
 */
exports.checkKeyRotation = () => {
    const stats = fs.statSync(keyFilePath);
    const lastModified = new Date(stats.mtime);
    const now = new Date();
    const diffInDays = Math.floor((now - lastModified) / (1000 * 60 * 60 * 24));

    if (diffInDays >= ROTATION_INTERVAL_DAYS) {
        console.log(`Key is older than ${ROTATION_INTERVAL_DAYS} days. Rotating key...`);
        exports.rotateKey();
    } else {
        console.log(`Key rotation not required. Last rotation was ${diffInDays} days ago.`);
    }
};

/**
 * Validates if a given key matches the current key in use.
 * @param {Buffer} key - The key to validate.
 * @returns {boolean} - Returns true if the key matches the current key, false otherwise.
 */
exports.validateKey = (key) => {
    const currentKey = exports.getCurrentKey();
    return key.equals(currentKey);
};
