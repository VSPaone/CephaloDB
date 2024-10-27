const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relationController');
const accessControlService = require('../services/accessControlService');

// Routes for relationship operations

/**
 * GET /relations
 * Retrieves all relationships.
 * Protected with 'read' permission.
 */
router.get('/', accessControlService.protectRoute('read'), relationController.getAllRelationships);

/**
 * GET /relations/:id
 * Retrieves a single relationship by its ID.
 * Protected with 'read' permission.
 */
router.get('/:id', accessControlService.protectRoute('read'), relationController.getRelationshipById);

/**
 * POST /relations
 * Creates a new relationship between nodes.
 * Protected with 'write' permission.
 */
router.post('/', accessControlService.protectRoute('write'), relationController.createRelationship);

/**
 * PUT /relations/:id
 * Updates an existing relationship by its ID.
 * Protected with 'write' permission.
 */
router.put('/:id', accessControlService.protectRoute('write'), relationController.updateRelationship);

/**
 * DELETE /relations/:id
 * Deletes a relationship by its ID.
 * Protected with 'delete' permission.
 */
router.delete('/:id', accessControlService.protectRoute('delete'), relationController.deleteRelationship);

module.exports = router;
