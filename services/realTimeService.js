// Import required modules and socket handler
const socketHandler = require('../sockets/socketHandler');

// Initialize variables to store connected clients
let io;
let clients = {};

/**
 * Initializes the real-time service with the Socket.IO instance.
 * @param {Object} server - The HTTP server instance.
 */
exports.initialize = (server) => {
    io = socketHandler.setupSocket(server);

    // Handle client connection
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Store the connected client
        clients[socket.id] = socket;

        // Handle client disconnect
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            delete clients[socket.id];
        });
    });
};

/**
 * Broadcasts a message to all connected clients.
 * @param {string} event - The event name.
 * @param {Object} data - The data to send with the event.
 */
exports.broadcast = (event, data) => {
    if (io) {
        io.emit(event, data);
        console.log(`Broadcasted event '${event}' to all clients.`);
    }
};

/**
 * Sends a message to a specific client.
 * @param {string} clientId - The ID of the client.
 * @param {string} event - The event name.
 * @param {Object} data - The data to send with the event.
 */
exports.sendToClient = (clientId, event, data) => {
    if (clients[clientId]) {
        clients[clientId].emit(event, data);
        console.log(`Sent event '${event}' to client ${clientId}.`);
    } else {
        console.error(`Client not found: ${clientId}`);
    }
};

/**
 * Notify all clients about document changes.
 * @param {Object} document - The updated or new document.
 */
exports.notifyDocumentChange = (document) => {
    this.broadcast('documentChange', document);
};

/**
 * Notify all clients about node changes.
 * @param {Object} node - The updated or new node.
 */
exports.notifyNodeChange = (node) => {
    this.broadcast('nodeChange', node);
};

/**
 * Notify all clients about state changes.
 * @param {Object} state - The updated state.
 */
exports.notifyStateChange = (state) => {
    this.broadcast('stateChange', state);
};
