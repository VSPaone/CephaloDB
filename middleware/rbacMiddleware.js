const accessControlService = require('../services/accessControlService');
const logger = require('../utils/logger');

/**
 * Middleware to enforce role-based access control on routes.
 * @param {Array<string>} allowedRoles - An array of roles that are allowed to access the route.
 * @returns {Function} - Middleware function that verifies if the user's role matches any of the allowed roles.
 */
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        // Ensure user information is available from the authentication middleware
        const user = req.user;
        if (!user || !user.role) {
            logger.warn('No user information or role available in the request.');
            return res.status(401).json({ error: 'Access denied. User information is missing or invalid.' });
        }

        // Check if the user's role is allowed
        const isAuthorized = accessControlService.hasRole(user.role, allowedRoles);
        if (!isAuthorized) {
            logger.warn(`User with ID ${user.id} and role ${user.role} is not authorized for this action.`);
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }

        // User has the required role; proceed to the next middleware or controller
        next();
    };
};

module.exports = authorize;
