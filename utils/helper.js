const { v4: uuidv4 } = require('uuid');

/**
 * Generates a unique identifier (UUID v4).
 * @returns {string} - A new UUID.
 */
exports.generateUUID = () => {
    return uuidv4();
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
exports.capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a date as 'YYYY-MM-DD'.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
exports.formatDate = (date) => {
    if (!(date instanceof Date)) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Formats a timestamp as 'YYYY-MM-DD HH:MM:SS'.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted timestamp string.
 */
exports.formatTimestamp = (date) => {
    if (!(date instanceof Date)) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Converts an array of objects into a map using a specified key.
 * @param {Array<Object>} array - The array of objects.
 * @param {string} key - The key to use for the map.
 * @returns {Map} - A map with keys based on the specified object property.
 */
exports.arrayToMap = (array, key) => {
    if (!Array.isArray(array)) return new Map();
    return array.reduce((map, item) => {
        if (item[key]) {
            map.set(item[key], item);
        }
        return map;
    }, new Map());
};

/**
 * Deep clones an object.
 * @param {Object} obj - The object to clone.
 * @returns {Object} - A deep clone of the object.
 */
exports.deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Checks if an object is empty.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - Returns true if the object is empty, false otherwise.
 */
exports.isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
exports.escapeRegExp = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Debounces a function to limit the rate at which it is invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before invoking.
 * @returns {Function} - A debounced version of the function.
 */
exports.debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Throttles a function to limit the rate at which it is invoked.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The number of milliseconds to wait before re-invoking.
 * @returns {Function} - A throttled version of the function.
 */
exports.throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
