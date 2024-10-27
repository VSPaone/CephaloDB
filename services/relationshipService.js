// Import required models and state components
const nodeModel = require('../models/nodeModel');
const globalState = require('../state/globalState');

/**
 * Create a relationship between two nodes
 * @param {string} nodeId1 - The ID of the first node.
 * @param {string} nodeId2 - The ID of the second node.
 * @param {string} relationshipType - The type of relationship (e.g., "similarity").
 * @returns {Object|null} - Returns the updated node or null if not found.
 */
exports.createRelationship = async (nodeId1, nodeId2, relationshipType) => {
    try {
        // Fetch the nodes using nodeModel
        const node1 = await nodeModel.getNodeById(nodeId1);
        const node2 = await nodeModel.getNodeById(nodeId2);

        if (!node1 || !node2) {
            console.error(`One or both nodes not found: ${nodeId1}, ${nodeId2}`);
            return null;
        }

        // Add the relationship to node1
        const updatedNode = await nodeModel.addRelationship(nodeId1, nodeId2, relationshipType);

        // Update global state relationship count
        updateGlobalRelationshipCount();

        return updatedNode;
    } catch (error) {
        console.error(`Error creating relationship: ${error.message}`);
        throw error;
    }
};

/**
 * Update an existing relationship between nodes
 * @param {string} nodeId1 - The ID of the first node.
 * @param {string} nodeId2 - The ID of the second node.
 * @param {string} newRelationshipType - The new type of relationship.
 * @returns {Object|null} - Returns the updated node or null if not found.
 */
exports.updateRelationship = async (nodeId1, nodeId2, newRelationshipType) => {
    try {
        // Fetch the nodes using nodeModel
        const node1 = await nodeModel.getNodeById(nodeId1);
        if (!node1) {
            console.error(`Node not found: ${nodeId1}`);
            return null;
        }

        // Find the relationship in node1 and update its type
        const relationship = node1.relationships.find(rel => rel.targetNodeId === nodeId2);
        if (!relationship) {
            console.error(`Relationship not found between Node ${nodeId1} and Node ${nodeId2}`);
            return null;
        }

        relationship.type = newRelationshipType;
        relationship.updatedAt = new Date().toISOString();

        // Update node1 in storage
        const updatedNode = await nodeModel.updateNode(nodeId1, node1);

        return updatedNode;
    } catch (error) {
        console.error(`Error updating relationship: ${error.message}`);
        throw error;
    }
};

/**
 * Delete a relationship between two nodes
 * @param {string} nodeId1 - The ID of the first node.
 * @param {string} nodeId2 - The ID of the second node.
 * @returns {Object|null} - Returns the updated node or null if not found.
 */
exports.deleteRelationship = async (nodeId1, nodeId2) => {
    try {
        // Fetch the nodes using nodeModel
        const node1 = await nodeModel.getNodeById(nodeId1);
        if (!node1) {
            console.error(`Node not found: ${nodeId1}`);
            return null;
        }

        // Filter out the relationship
        const updatedRelationships = node1.relationships.filter(rel => rel.targetNodeId !== nodeId2);
        if (updatedRelationships.length === node1.relationships.length) {
            console.error(`Relationship not found between Node ${nodeId1} and Node ${nodeId2}`);
            return null;
        }

        node1.relationships = updatedRelationships;
        node1.updatedAt = new Date().toISOString();

        // Update node1 in storage
        const updatedNode = await nodeModel.updateNode(nodeId1, node1);

        // Update global state relationship count
        updateGlobalRelationshipCount();

        return updatedNode;
    } catch (error) {
        console.error(`Error deleting relationship: ${error.message}`);
        throw error;
    }
};

/**
 * Get all relationships in the system
 * @returns {Array} - Returns an array of all relationships between nodes.
 */
exports.getAllRelationships = async () => {
    try {
        const nodes = await nodeModel.getAllNodes();
        const relationships = [];

        // Iterate through all nodes and collect their relationships
        nodes.forEach(node => {
            node.relationships.forEach(rel => {
                relationships.push({
                    sourceNodeId: node.id,
                    targetNodeId: rel.targetNodeId,
                    type: rel.type,
                    createdAt: rel.createdAt,
                    updatedAt: rel.updatedAt,
                });
            });
        });

        return relationships;
    } catch (error) {
        console.error(`Error fetching all relationships: ${error.message}`);
        throw error;
    }
};

/**
 * Update the global state relationship count
 * Ensures the global state accurately reflects the total number of relationships in the system.
 */
const updateGlobalRelationshipCount = async () => {
    try {
        const relationships = await exports.getAllRelationships();
        globalState.updateState('relationshipCount', relationships.length);
    } catch (error) {
        console.error(`Error updating global relationship count: ${error.message}`);
        throw error;
    }
};
