const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const accessControlService = require('../services/accessControlService');
const logger = require('../utils/logger');

dotenv.config();

/**
 * Middleware to verify JWT tokens in incoming requests.
 * If the token is valid, it attaches the user information to the request object.
 * If the token is invalid or missing, it returns a 401 Unauthorized response.
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.warn('No token provided.');
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            logger.error(`Token verification failed: ${err.message}`);
            return res.status(403).json({ error: 'Invalid token.' });
        }

        // Attach user information to the request object
        req.user = user;
        next();
    });
};

/**
 * Middleware to authorize users based on roles.
 * Checks if the user has the required role to access the endpoint.
 * @param {Array<string>} allowedRoles - The roles allowed to access the endpoint.
 * @returns {Function} - Middleware function that checks user roles.
 */
const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        // Ensure user information is available
        if (!req.user) {
            logger.warn('No user information available in the request.');
            return res.status(401).json({ error: 'Access denied. User information is missing.' });
        }

        // Check if the user has the required role
        const hasAccess = accessControlService.hasRole(req.user, allowedRoles);
        if (!hasAccess) {
            logger.warn(`User ${req.user.id} does not have the required role(s): ${allowedRoles.join(', ')}`);
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

/**
 * Middleware to protect routes using both authentication and authorization.
 * Combines token authentication and role authorization into one middleware function.
 * @param {Array<string>} allowedRoles - The roles allowed to access the endpoint.
 * @returns {Function} - Middleware function that combines authentication and authorization.
 */
const protectRoute = (allowedRoles) => {
    return [authenticateToken, authorizeRoles(allowedRoles)];
};

module.exports = {
    authenticateToken,
    authorizeRoles,
    protectRoute,
};
