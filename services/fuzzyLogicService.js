// Import required models and services
const documentModel = require('../models/documentModel');
const nodeModel = require('../models/nodeModel');
const relationshipService = require('../services/relationshipService');
const globalState = require('../state/globalState');

/**
 * Analyzes node data to identify potential relationships based on similarity or rules.
 * @param {Object} node - The node object to analyze.
 */
exports.analyzeNodeForRelationships = async (node) => {
    try {
        // Fetch all other nodes from the system
        const allNodes = await nodeModel.getAllNodes();

        // Iterate through all nodes to find potential matches
        for (let targetNode of allNodes) {
            if (node.id !== targetNode.id) {
                // Apply fuzzy logic to determine similarity
                const similarityScore = calculateSimilarity(node, targetNode);

                // Define a threshold score to determine if a relationship should be created
                if (similarityScore > 0.7) {
                    await relationshipService.createRelationship(node.id, targetNode.id, 'similarity');
                    console.log(`Relationship created between Node ${node.id} and Node ${targetNode.id}`);
                }
            }
        }

        // Update the global state to reflect the new relationships
        updateGlobalStateForRelationships();

    } catch (error) {
        console.error(`Error analyzing node for relationships: ${error.message}`);
    }
};

/**
 * Analyzes all documents in the system to establish relationships between nodes dynamically.
 */
exports.analyzeDocumentsForRelationships = async () => {
    try {
        // Fetch all documents
        const documents = await documentModel.getAllDocuments();

        // Iterate through each document to analyze its nodes
        for (let document of documents) {
            for (let node of document.nodes) {
                await exports.analyzeNodeForRelationships(node);
            }
        }
    } catch (error) {
        console.error(`Error analyzing documents for relationships: ${error.message}`);
    }
};

/**
 * Updates relationships based on predefined rules.
 * For example, if a node count reaches a certain threshold, it might trigger a relationship update.
 */
exports.applyRulesForRelationshipUpdates = async () => {
    try {
        const state = globalState.getState();
        const nodeCount = state.nodeCount;

        // Example rule: If nodeCount exceeds 50, perform a specific relationship update
        if (nodeCount > 50) {
            console.log('Applying rule-based relationship updates...');
            const allNodes = await nodeModel.getAllNodes();
            for (let node of allNodes) {
                // Apply a specific rule to update the relationships
                await exports.analyzeNodeForRelationships(node);
            }
        }
    } catch (error) {
        console.error(`Error applying rules for relationship updates: ${error.message}`);
    }
};

/**
 * Calculate the similarity between two nodes using a basic fuzzy logic formula.
 * @param {Object} node1 - The first node.
 * @param {Object} node2 - The second node.
 * @returns {number} - A score between 0 and 1 indicating similarity.
 */
const calculateSimilarity = (node1, node2) => {
    let score = 0;

    // Example similarity check based on node attributes (extend as needed)
    if (node1.type === node2.type) score += 0.4;
    if (node1.category === node2.category) score += 0.3;
    if (node1.value && node2.value && node1.value === node2.value) score += 0.3;

    return score;
};

/**
 * Updates the global state when relationships are modified.
 * Ensures that the global state accurately reflects the number of relationships.
 */
const updateGlobalStateForRelationships = () => {
    const state = globalState.getState();

    // Recalculate the number of relationships in the system
    relationshipService.getAllRelationships().then((relationships) => {
        state.relationshipCount = relationships.length;
        globalState.updateState('relationshipCount', state.relationshipCount);
    }).catch(error => {
        console.error(`Error updating global state for relationships: ${error.message}`);
    });
};
