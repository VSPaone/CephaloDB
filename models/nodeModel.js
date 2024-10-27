// Import required services and modules
const fs = require('fs');
const path = require('path');
const encryptionService = require('../services/encryptionService');

// Define the path to the storage file
const nodesPath = path.join(__dirname, '../data/encrypted/nodes.enc');

// Helper function to read and decrypt the nodes file
const readNodesFile = () => {
    if (!fs.existsSync(nodesPath)) {
        return [];
    }
    const encryptedData = fs.readFileSync(nodesPath, 'utf8');
    return encryptionService.decryptData(encryptedData);
};

// Helper function to encrypt and write data to the nodes file
const writeNodesFile = (nodes) => {
    const encryptedData = encryptionService.encryptData(nodes);
    fs.writeFileSync(nodesPath, encryptedData, 'utf8');
};

// Model functions

/**
 * Get all nodes
 * Returns all nodes from the storage after decryption.
 */
exports.getAllNodes = async () => {
    return readNodesFile();
};

/**
 * Get a node by ID
 * Returns a specific node based on its ID.
 */
exports.getNodeById = async (id) => {
    const nodes = readNodesFile();
    return nodes.find((node) => node.id === id);
};

/**
 * Create a new node
 * Adds a new node to the storage and returns it.
 */
exports.createNode = async (data) => {
    const nodes = readNodesFile();
    const newNode = {
        id: generateUniqueId(),
        ...data,
        relationships: [], // Initialize relationships as an empty array
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    nodes.push(newNode);
    writeNodesFile(nodes);
    return newNode;
};

/**
 * Update an existing node
 * Updates the data of a node by its ID.
 */
exports.updateNode = async (id, data) => {
    const nodes = readNodesFile();
    const nodeIndex = nodes.findIndex((node) => node.id === id);

    if (nodeIndex === -1) {
        return null;
    }

    const updatedNode = {
        ...nodes[nodeIndex],
        ...data,
        updatedAt: new Date().toISOString(),
    };

    nodes[nodeIndex] = updatedNode;
    writeNodesFile(nodes);
    return updatedNode;
};

/**
 * Delete a node by ID
 * Removes a node from the storage.
 */
exports.deleteNode = async (id) => {
    let nodes = readNodesFile();
    const nodeIndex = nodes.findIndex((node) => node.id === id);

    if (nodeIndex === -1) {
        return null;
    }

    const deletedNode = nodes[nodeIndex];
    nodes = nodes.filter((node) => node.id !== id);
    writeNodesFile(nodes);
    return deletedNode;
};

/**
 * Add a relationship between nodes
 * Adds a relationship between two nodes by their IDs.
 */
exports.addRelationship = async (nodeId1, nodeId2, relationshipType) => {
    const nodes = readNodesFile();
    const node1 = nodes.find((node) => node.id === nodeId1);
    const node2 = nodes.find((node) => node.id === nodeId2);

    if (!node1 || !node2) {
        return null;
    }

    // Add the relationship to node1
    node1.relationships.push({
        targetNodeId: node2.id,
        type: relationshipType,
        createdAt: new Date().toISOString(),
    });

    // Update nodes in storage
    writeNodesFile(nodes);
    return node1;
};

// Utility function to generate unique IDs
const generateUniqueId = () => {
    return 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};
