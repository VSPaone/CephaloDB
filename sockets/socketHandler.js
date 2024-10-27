const { Server } = require('socket.io');

// Initialize the Socket.IO instance
let io;

/**
 * Sets up the Socket.IO server.
 * @param {Object} server - The HTTP server instance.
 * @returns {Object} - The initialized Socket.IO instance.
 */
exports.setupSocket = (server) => {
    // Initialize the Socket.IO instance with the HTTP server
    io = new Server(server, {
        cors: {
            origin: '*', // Allow any origin (configure this for production)
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
    });

    // Handle connection events
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Handle disconnection events
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

        // Additional event handlers can be added here
    });

    return io;
};

/**
 * Broadcasts a message to all connected clients.
 * @param {string} event - The event name to broadcast (e.g., 'documentChange').
 * @param {Object} data - The data to send with the event.
 */
exports.broadcastToAll = (event, data) => {
    if (io) {
        io.emit(event, data);
        console.log(`Broadcasted event '${event}' to all clients.`);
    }
};

/**
 * Sends a message to a specific client.
 * @param {string} clientId - The ID of the client.
 * @param {string} event - The event name to send (e.g., 'stateChange').
 * @param {Object} data - The data to send with the event.
 */
exports.sendToClient = (clientId, event, data) => {
    if (io && io.sockets.sockets.get(clientId)) {
        io.sockets.sockets.get(clientId).emit(event, data);
        console.log(`Sent event '${event}' to client ${clientId}.`);
    } else {
        console.error(`Client not found: ${clientId}`);
    }
};
