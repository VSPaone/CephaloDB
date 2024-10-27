// Import required services and global state
const stateService = require('../services/stateService');
const globalState = require('../state/globalState');

/**
 * Get the current global state
 * Returns the entire global state.
 */
exports.getGlobalState = (req, res) => {
    try {
        const currentState = globalState.getState();
        res.status(200).json({ success: true, data: currentState });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching global state', error: error.message });
    }
};

/**
 * Update the global state
 * Updates a specific key-value pair in the global state.
 */
exports.updateGlobalState = (req, res) => {
    try {
        const { key, value } = req.body;

        // Update the state using the stateService
        const updatedState = stateService.updateState(key, value);

        res.status(200).json({ success: true, data: updatedState });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating global state', error: error.message });
    }
};

/**
 * Reset the global state
 * Resets the entire global state to its default values.
 */
exports.resetGlobalState = (req, res) => {
    try {
        // Reset the state using the stateService
        stateService.resetState();

        res.status(200).json({ success: true, message: 'Global state has been reset to default values' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error resetting global state', error: error.message });
    }
};

/**
 * Synchronize the global state
 * Synchronizes the state across multiple components or services based on changes.
 */
exports.synchronizeState = async (req, res) => {
    try {
        await stateService.synchronizeState();

        res.status(200).json({ success: true, message: 'Global state synchronized successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error synchronizing global state', error: error.message });
    }
};
