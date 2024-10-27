const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const accessControlService = require('../services/accessControlService');

// Routes for state operations

/**
 * GET /state
 * Retrieves the entire global state.
 * Protected with 'read' permission.
 */
router.get('/', accessControlService.protectRoute('read'), stateController.getGlobalState);

/**
 * GET /state/:key
 * Retrieves the value of a specific state key.
 * Protected with 'read' permission.
 */
router.get('/:key', accessControlService.protectRoute('read'), (req, res) => {
    const key = req.params.key;
    stateController.getGlobalStateKey(key, res);
});

/**
 * PUT /state/:key
 * Updates the value of a specific state key.
 * Protected with 'write' permission.
 */
router.put('/:key', accessControlService.protectRoute('write'), (req, res) => {
    const key = req.params.key;
    const value = req.body.value;
    stateController.updateGlobalStateKey(key, value, res);
});

/**
 * POST /state/reset
 * Resets the entire global state to its default values.
 * Protected with 'write' permission.
 */
router.post('/reset', accessControlService.protectRoute('write'), stateController.resetGlobalState);

/**
 * POST /state/synchronize
 * Synchronizes the global state across all services.
 * Protected with 'write' permission.
 */
router.post('/synchronize', accessControlService.protectRoute('write'), stateController.synchronizeState);

module.exports = router;
