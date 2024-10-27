const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const accessControlService = require('../services/accessControlService');

// Routes for document operations

/**
 * GET /documents
 * Retrieves all documents.
 * Protected with 'read' permission.
 */
router.get('/', accessControlService.protectRoute('read'), documentController.getDocuments);

/**
 * GET /documents/:id
 * Retrieves a single document by its ID.
 * Protected with 'read' permission.
 */
router.get('/:id', accessControlService.protectRoute('read'), documentController.getDocumentById);

/**
 * POST /documents
 * Creates a new document.
 * Protected with 'write' permission.
 */
router.post('/', accessControlService.protectRoute('write'), documentController.createDocument);

/**
 * PUT /documents/:id
 * Updates an existing document by its ID.
 * Protected with 'write' permission.
 */
router.put('/:id', accessControlService.protectRoute('write'), documentController.updateDocument);

/**
 * DELETE /documents/:id
 * Deletes a document by its ID.
 * Protected with 'delete' permission.
 */
router.delete('/:id', accessControlService.protectRoute('delete'), documentController.deleteDocument);

module.exports = router;
