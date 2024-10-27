const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Hashing configuration
const HASH_ALGORITHM = 'sha256';
const ENCRYPTION_ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // Initialization vector length for AES

/**
 * Hashes a string using SHA-256.
 * @param {string} data - The data to hash.
 * @returns {string} - The hashed value as a hex string.
 */
exports.hashData = (data) => {
    return crypto.createHash(HASH_ALGORITHM).update(data).digest('hex');
};

/**
 * Compares a plain string to a hashed value.
 * @param {string} plainData - The plain string.
 * @param {string} hashedData - The hashed value to compare against.
 * @returns {boolean} - Returns true if they match, false otherwise.
 */
exports.compareHash = (plainData, hashedData) => {
    const hash = exports.hashData(plainData);
    return hash === hashedData;
};

/**
 * Encrypts data using AES-256-CBC.
 * @param {string} text - The text to encrypt.
 * @param {Buffer} key - The encryption key (32 bytes).
 * @returns {string} - The encrypted text in hex format with the IV prepended.
 */
exports.encryptData = (text, key) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

/**
 * Decrypts data encrypted with AES-256-CBC.
 * @param {string} encryptedText - The encrypted text with IV prepended.
 * @param {Buffer} key - The encryption key (32 bytes).
 * @returns {string} - The decrypted text.
 */
exports.decryptData = (encryptedText, key) => {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

/**
 * Generates a JWT token.
 * @param {Object} payload - The payload to include in the token.
 * @param {string} expiresIn - The token expiration time (e.g., '1h', '7d').
 * @returns {string} - The generated JWT token.
 */
exports.generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Validates a JWT token.
 * @param {string} token - The token to validate.
 * @returns {Object|null} - The decoded payload if the token is valid, otherwise null.
 */
exports.validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error(`Token validation failed: ${error.message}`);
        return null;
    }
};

/**
 * Generates a random salt for hashing purposes.
 * @returns {string} - A random salt in hex format.
 */
exports.generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

/**
 * Hashes a string using SHA-256 with a salt.
 * @param {string} data - The data to hash.
 * @param {string} salt - The salt to use for hashing.
 * @returns {string} - The salted hash in hex format.
 */
exports.hashDataWithSalt = (data, salt) => {
    return crypto.createHash(HASH_ALGORITHM).update(data + salt).digest('hex');
};
