// Import required modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Define roles and permissions (this can be extended or loaded from a config file or database)
const roles = {
    admin: ['read', 'write', 'delete', 'manage'],
    editor: ['read', 'write', 'delete'],
    viewer: ['read'],
};

/**
 * Authenticates a user using JWT.
 * @param {string} token - The JWT token provided by the user.
 * @returns {Object|null} - Returns the decoded user object if valid, otherwise null.
 */
exports.authenticateUser = (token) => {
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error(`Authentication failed: ${error.message}`);
        return null;
    }
};

/**
 * Checks if a user has a specific role.
 * @param {Object} user - The user object containing user details.
 * @param {string} role - The role to check against the user's roles.
 * @returns {boolean} - Returns true if the user has the role, false otherwise.
 */
exports.hasRole = (user, role) => {
    return user.roles && user.roles.includes(role);
};

/**
 * Checks if a user has permission to perform a specific action.
 * @param {Object} user - The user object containing user details.
 * @param {string} action - The action to check (e.g., 'read', 'write').
 * @returns {boolean} - Returns true if the user has the required permission, false otherwise.
 */
exports.hasPermission = (user, action) => {
    if (!user || !user.roles) {
        return false;
    }

    // Check if any of the user's roles have the required permission
    return user.roles.some((role) => roles[role] && roles[role].includes(action));
};

/**
 * Middleware function to protect routes based on roles and permissions.
 * @param {string} action - The action required for the route (e.g., 'read', 'write').
 * @returns {function} - Middleware function for Express routes.
 */
exports.protectRoute = (action) => {
    return (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Authenticate the user
        const user = exports.authenticateUser(token);

        if (!user) {
            return res.status(401).json({ message: 'Access denied. Invalid token.' });
        }

        // Check if the user has the required permission
        if (!exports.hasPermission(user, action)) {
            return res.status(403).json({ message: 'Forbidden. Insufficient permissions.' });
        }

        // Attach the user to the request object for use in controllers
        req.user = user;
        next();
    };
};
