const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

// Middleware imports
const authMiddleware = require('./middleware/authMiddleware');
const encryptionMiddleware = require('./middleware/encryptionMiddleware');
const rbacMiddleware = require('./middleware/rbacMiddleware');

// Route imports
const documentRoutes = require('./routes/documentRoutes');
const relationRoutes = require('./routes/relationRoutes');
const stateRoutes = require('./routes/stateRoutes');

// Socket handler import
const socketHandler = require('./sockets/socketHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic middleware setup for logging and error handling
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Route setup
app.use('/api/documents', authMiddleware.authenticateToken, documentRoutes);
app.use('/api/relations', authMiddleware.authenticateToken, relationRoutes);
app.use('/api/state', authMiddleware.authenticateToken, stateRoutes);

// WebSocket integration
socketHandler(io);

// Global error handling
app.use((err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
});

// Server initialization
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, server };
