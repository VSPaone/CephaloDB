// Import required services
const fs = require('fs');
const path = require('path');
const encryptionService = require('../services/encryptionService');

// Define the path to the storage file
const documentsPath = path.join(__dirname, '../data/encrypted/documents.enc');

// Helper function to read and decrypt the documents file
const readDocumentsFile = () => {
    if (!fs.existsSync(documentsPath)) {
        return [];
    }
    const encryptedData = fs.readFileSync(documentsPath, 'utf8');
    return encryptionService.decryptData(encryptedData);
};

// Helper function to encrypt and write data to the documents file
const writeDocumentsFile = (documents) => {
    const encryptedData = encryptionService.encryptData(documents);
    fs.writeFileSync(documentsPath, encryptedData, 'utf8');
};

// Model functions

/**
 * Get all documents
 * Returns all documents from the storage after decryption.
 */
exports.getAllDocuments = async () => {
    return readDocumentsFile();
};

/**
 * Get a document by ID
 * Returns a specific document based on its ID.
 */
exports.getDocumentById = async (id) => {
    const documents = readDocumentsFile();
    return documents.find((doc) => doc.id === id);
};

/**
 * Create a new document
 * Adds a new document to the storage and returns it.
 */
exports.createDocument = async (data) => {
    const documents = readDocumentsFile();
    const newDocument = {
        id: generateUniqueId(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    documents.push(newDocument);
    writeDocumentsFile(documents);
    return newDocument;
};

/**
 * Update an existing document
 * Updates the data of a document by its ID.
 */
exports.updateDocument = async (id, data) => {
    const documents = readDocumentsFile();
    const documentIndex = documents.findIndex((doc) => doc.id === id);

    if (documentIndex === -1) {
        return null;
    }

    const updatedDocument = {
        ...documents[documentIndex],
        ...data,
        updatedAt: new Date().toISOString(),
    };

    documents[documentIndex] = updatedDocument;
    writeDocumentsFile(documents);
    return updatedDocument;
};

/**
 * Delete a document by ID
 * Removes a document from the storage.
 */
exports.deleteDocument = async (id) => {
    let documents = readDocumentsFile();
    const documentIndex = documents.findIndex((doc) => doc.id === id);

    if (documentIndex === -1) {
        return null;
    }

    const deletedDocument = documents[documentIndex];
    documents = documents.filter((doc) => doc.id !== id);
    writeDocumentsFile(documents);
    return deletedDocument;
};

// Utility function to generate unique IDs
const generateUniqueId = () => {
    return 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};
