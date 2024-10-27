// Import required services and models
const documentModel = require('../models/documentModel');
const encryptionService = require('../services/encryptionService');
const fuzzyLogicService = require('../services/fuzzyLogicService');

// Controller functions

/**
 * Get all documents
 * Fetches and returns all documents after decrypting them.
 */
exports.getDocuments = async (req, res) => {
    try {
        // Fetch all documents from the model
        const documents = await documentModel.getAllDocuments();

        // Decrypt documents
        const decryptedDocuments = documents.map(doc => encryptionService.decryptData(doc));

        // Send response
        res.status(200).json({ success: true, data: decryptedDocuments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching documents', error: error.message });
    }
};

/**
 * Get a single document by ID
 * Fetches and returns a single document after decrypting it.
 */
exports.getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await documentModel.getDocumentById(id);

        if (!document) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        // Decrypt document
        const decryptedDocument = encryptionService.decryptData(document);

        res.status(200).json({ success: true, data: decryptedDocument });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching document', error: error.message });
    }
};

/**
 * Create a new document
 * Encrypts the document data before saving it.
 */
exports.createDocument = async (req, res) => {
    try {
        const { data } = req.body;

        // Encrypt document data
        const encryptedData = encryptionService.encryptData(data);

        // Save the encrypted document using the model
        const newDocument = await documentModel.createDocument(encryptedData);

        // Update relationships using fuzzy logic
        fuzzyLogicService.updateRelationships(newDocument);

        res.status(201).json({ success: true, data: newDocument });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating document', error: error.message });
    }
};

/**
 * Update a document by ID
 * Encrypts the updated data and updates the document in storage.
 */
exports.updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        // Encrypt the updated document data
        const encryptedData = encryptionService.encryptData(data);

        // Update the document using the model
        const updatedDocument = await documentModel.updateDocument(id, encryptedData);

        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        // Update relationships using fuzzy logic
        fuzzyLogicService.updateRelationships(updatedDocument);

        res.status(200).json({ success: true, data: updatedDocument });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating document', error: error.message });
    }
};

/**
 * Delete a document by ID
 * Removes the document from storage.
 */
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the document using the model
        const deletedDocument = await documentModel.deleteDocument(id);

        if (!deletedDocument) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        res.status(200).json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting document', error: error.message });
    }
};
