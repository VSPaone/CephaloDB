// Import required services and models
const relationshipService = require('../services/relationshipService');
const stateService = require('../services/stateService');
const nodeModel = require('../models/nodeModel');

/**
 * Establish a new relationship between nodes
 * Creates a relationship between two nodes based on fuzzy logic rules.
 */
exports.createRelationship = async (req, res) => {
    try {
        const { nodeId1, nodeId2, relationshipType } = req.body;

        // Fetch nodes using nodeModel
        const node1 = await nodeModel.getNodeById(nodeId1);
        const node2 = await nodeModel.getNodeById(nodeId2);

        if (!node1 || !node2) {
            return res.status(404).json({ success: false, message: 'One or both nodes not found' });
        }

        // Create a relationship using the relationshipService
        const relationship = await relationshipService.createRelationship(node1, node2, relationshipType);

        // Update the global state to maintain consistency
        await stateService.updateGlobalState();

        res.status(201).json({ success: true, data: relationship });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating relationship', error: error.message });
    }
};

/**
 * Update an existing relationship between nodes
 * Modifies an existing relationship between nodes.
 */
exports.updateRelationship = async (req, res) => {
    try {
        const { relationshipId } = req.params;
        const { newRelationshipType } = req.body;

        // Update the relationship using the relationshipService
        const updatedRelationship = await relationshipService.updateRelationship(relationshipId, newRelationshipType);

        if (!updatedRelationship) {
            return res.status(404).json({ success: false, message: 'Relationship not found' });
        }

        // Update the global state to maintain consistency
        await stateService.updateGlobalState();

        res.status(200).json({ success: true, data: updatedRelationship });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating relationship', error: error.message });
    }
};

/**
 * Delete a relationship by ID
 * Removes a relationship from storage and updates the state.
 */
exports.deleteRelationship = async (req, res) => {
    try {
        const { relationshipId } = req.params;

        // Delete the relationship using the relationshipService
        const deletedRelationship = await relationshipService.deleteRelationship(relationshipId);

        if (!deletedRelationship) {
            return res.status(404).json({ success: false, message: 'Relationship not found' });
        }

        // Update the global state to maintain consistency
        await stateService.updateGlobalState();

        res.status(200).json({ success: true, message: 'Relationship deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting relationship', error: error.message });
    }
};

/**
 * Get all relationships
 * Fetches all relationships between nodes.
 */
exports.getAllRelationships = async (req, res) => {
    try {
        // Fetch all relationships using the relationshipService
        const relationships = await relationshipService.getAllRelationships();

        res.status(200).json({ success: true, data: relationships });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching relationships', error: error.message });
    }
};

/**
 * Get a specific relationship by ID
 * Fetches a single relationship using its ID.
 */
exports.getRelationshipById = async (req, res) => {
    try {
        const { relationshipId } = req.params;

        // Fetch the relationship using the relationshipService
        const relationship = await relationshipService.getRelationshipById(relationshipId);

        if (!relationship) {
            return res.status(404).json({ success: false, message: 'Relationship not found' });
        }

        res.status(200).json({ success: true, data: relationship });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching relationship', error: error.message });
    }
};
