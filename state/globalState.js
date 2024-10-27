const fs = require('fs');
const path = require('path');

// Define the path to the state storage file
const stateFilePath = path.join(__dirname, '../data/encrypted/state.enc');

// Initial default state structure
const defaultState = {
    lastModified: new Date().toISOString(),
    nodeCount: 0,
    documentCount: 0,
    relationshipCount: 0,
    settings: {
        encryption: true,
        autoSync: true,
        logging: true,
    },
    rules: {
        maxNodesPerDocument: 100,
        maxRelationshipsPerNode: 10,
    },
};

// Helper function to read and parse the global state file
const readStateFile = () => {
    if (!fs.existsSync(stateFilePath)) {
        return { ...defaultState };
    }
    const fileData = fs.readFileSync(stateFilePath, 'utf8');
    return JSON.parse(fileData);
};

// Helper function to write and save the global state file
const writeStateFile = (state) => {
    const data = JSON.stringify(state, null, 2);
    fs.writeFileSync(stateFilePath, data, 'utf8');
};

// Global state object to hold the current state in memory
let state = readStateFile();

/**
 * Get the current global state.
 * @returns {Object} - The current global state.
 */
exports.getState = () => {
    return { ...state }; // Return a copy to prevent direct mutation
};

/**
 * Update a specific key-value pair in the global state.
 * @param {string} key - The key to update in the global state.
 * @param {*} value - The new value for the key.
 * @returns {Object} - The updated global state.
 */
exports.updateState = (key, value) => {
    if (!Object.hasOwnProperty.call(state, key)) {
        throw new Error(`Invalid key: ${key}`);
    }

    state[key] = value;
    state.lastModified = new Date().toISOString();
    writeStateFile(state);

    return { ...state }; // Return the updated state
};

/**
 * Reset the global state to its default values.
 */
exports.resetState = () => {
    state = { ...defaultState };
    writeStateFile(state);
};

/**
 * Validate state updates based on rules.
 * @param {string} key - The state key being updated.
 * @param {*} value - The new value for the state key.
 */
exports.validateStateUpdate = (key, value) => {
    switch (key) {
        case 'nodeCount':
            if (value < 0 || value > state.rules.maxNodesPerDocument) {
                throw new Error(`nodeCount must be between 0 and ${state.rules.maxNodesPerDocument}`);
            }
            break;
        case 'relationshipCount':
            if (value < 0 || value > state.rules.maxRelationshipsPerNode) {
                throw new Error(`relationshipCount must be between 0 and ${state.rules.maxRelationshipsPerNode}`);
            }
            break;
        // Add additional validations as necessary for other keys
        default:
            // No specific rule for the key, allowing it
            break;
    }
};

/**
 * Synchronize the state across services.
 * This is a placeholder function for potential state synchronization logic.
 */
exports.synchronizeState = () => {
    // Placeholder for actual synchronization logic
    console.log('State synchronization logic here');
};
