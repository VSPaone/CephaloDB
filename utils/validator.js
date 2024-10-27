const validator = require('validator');

/**
 * Validates if a value is a non-empty string.
 * @param {string} value - The value to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates if a value is a valid email.
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isValidEmail = (email) => {
    return validator.isEmail(email);
};

/**
 * Validates if a value is a valid URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isValidURL = (url) => {
    return validator.isURL(url);
};

/**
 * Validates if a value is an integer within a specified range.
 * @param {number} value - The integer value to validate.
 * @param {number} [min] - The minimum value (inclusive).
 * @param {number} [max] - The maximum value (inclusive).
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isIntegerInRange = (value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {
    return Number.isInteger(value) && value >= min && value <= max;
};

/**
 * Validates if a string matches a specific regular expression pattern.
 * @param {string} value - The string to validate.
 * @param {RegExp} pattern - The regex pattern to match.
 * @returns {boolean} - Returns true if the string matches the pattern, false otherwise.
 */
exports.matchesPattern = (value, pattern) => {
    return typeof value === 'string' && pattern.test(value);
};

/**
 * Validates if a value is a valid UUID (v4).
 * @param {string} uuid - The UUID to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isValidUUID = (uuid) => {
    return validator.isUUID(uuid, 4);
};

/**
 * Validates if a value is a valid JSON object.
 * @param {string} jsonString - The JSON string to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isValidJSON = (jsonString) => {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Validates if a value is a date and optionally checks if it's within a range.
 * @param {string} date - The date to validate.
 * @param {Date} [minDate] - The minimum date (inclusive).
 * @param {Date} [maxDate] - The maximum date (inclusive).
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isValidDate = (date, minDate, maxDate) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return false;
    }
    if (minDate && parsedDate < minDate) {
        return false;
    }
    if (maxDate && parsedDate > maxDate) {
        return false;
    }
    return true;
};

/**
 * Validates if an object has all the required keys.
 * @param {Object} obj - The object to validate.
 * @param {Array<string>} requiredKeys - An array of keys that must be present in the object.
 * @returns {boolean} - Returns true if the object contains all required keys, false otherwise.
 */
exports.hasRequiredKeys = (obj, requiredKeys) => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    return requiredKeys.every((key) => obj.hasOwnProperty(key));
};
