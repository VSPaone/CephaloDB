// Import required modules
const fs = require('fs');
const path = require('path');

// Define the path to the state storage file
const statePath = path.join(__dirname, '../data/encrypted/state.enc');

// Initial default state structure
const defaultState = {
    lastModified: new Date().toISOString(),
    nodeCount: 0,
    documentCount: 0,
    relationships: [],
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
    if (!fs.existsSync(statePath)) {
        return { ...defaultState };
    }
    const encryptedData = fs.readFileSync(statePath, 'utf8');
    return JSON.parse(encryptedData); // Assuming encryptionService is not used for simplicity here; add if needed
};

// Helper function to write and save the global state file
const writeStateFile = (state) => {
    const data = JSON.stringify(state, null, 2);
    fs.writeFileSync(statePath, data, 'utf8'); // Assuming encryptionService is not used for simplicity here; add if needed
};

// Model functions

/**
 * Get the current global state
 * Returns the entire state object.
 */
exports.getState = () => {
    return readStateFile();
};

/**
 * Update a specific state key with a new value
 * Validates and updates the state.
 */
exports.updateState = (key, value) => {
    const state = readStateFile();

    if (!Object.hasOwnProperty.call(state, key)) {
        throw new Error(`Invalid key: ${key}`);
    }

    state[key] = value;
    state.lastModified = new Date().toISOString();
    writeStateFile(state);
    return state;
};

/**
 * Reset the state to its default values
 * Overwrites the current state with default values.
 */
exports.resetState = () => {
    writeStateFile({ ...defaultState });
};

/**
 * Validate state updates based on rules
 * Ensures updates adhere to global rules defined in the state.
 */
exports.validateStateUpdate = (key, value) => {
    const state = readStateFile();
    const rules = state.rules;

    switch (key) {
        case 'nodeCount':
            if (value < 0 || value > rules.maxNodesPerDocument) {
                throw new Error(`nodeCount must be between 0 and ${rules.maxNodesPerDocument}`);
            }
            break;
        case 'relationships':
            if (value.length > rules.maxRelationshipsPerNode) {
                throw new Error(`A node cannot have more than ${rules.maxRelationshipsPerNode} relationships`);
            }
            break;
        // Add additional validations as necessary
        default:
            // No specific rule for the key, allowing it
            break;
    }
};

/**
 * Synchronize the state with other services
 * Ensures consistency across the system by synchronizing state changes.
 */
exports.synchronizeState = () => {
    // Logic to synchronize state with other services (e.g., database, nodes, relationships)
    console.log('State synchronization logic here');
};
