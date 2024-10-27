// Import required modules and state components
const globalState = require('../state/globalState');
const stateListener = require('../state/stateListener');

/**
 * Get the current global state
 * Returns the entire state object.
 */
exports.getGlobalState = () => {
    return globalState.getState();
};

/**
 * Update a specific state key with a new value
 * Validates and updates the state, and notifies listeners of the change.
 */
exports.updateState = (key, value) => {
    try {
        // Validate the state update using globalState validation method
        globalState.validateStateUpdate(key, value);

        // Update the state
        const updatedState = globalState.updateState(key, value);

        // Notify listeners of the state change
        stateListener.notifyListeners(key, value);

        return updatedState;
    } catch (error) {
        console.error(`Error updating global state: ${error.message}`);
        throw error;
    }
};

/**
 * Reset the global state to its default values
 * Resets the state and notifies listeners of the reset event.
 */
exports.resetState = () => {
    try {
        // Reset the state in globalState
        globalState.resetState();

        // Notify listeners about the state reset
        stateListener.notifyListeners('reset', globalState.getState());

        console.log('Global state has been reset to default values');
    } catch (error) {
        console.error(`Error resetting global state: ${error.message}`);
        throw error;
    }
};

/**
 * Synchronize the global state
 * Synchronizes the state across multiple components or services.
 */
exports.synchronizeState = async () => {
    try {
        console.log('Synchronizing global state...');
        const currentState = globalState.getState();

        // Implement synchronization logic here (e.g., syncing with external services or components)
        // This is a placeholder for future extension

        stateListener.notifyListeners('synchronize', currentState);
        console.log('Global state synchronized successfully');
    } catch (error) {
        console.error(`Error synchronizing global state: ${error.message}`);
        throw error;
    }
};

/**
 * Listen for state changes and respond accordingly
 * Subscribes to state changes through stateListener.
 */
exports.subscribeToStateChanges = (listenerFunction) => {
    try {
        // Subscribe a listener to state changes
        stateListener.addListener(listenerFunction);
        console.log('Listener subscribed to global state changes');
    } catch (error) {
        console.error(`Error subscribing to state changes: ${error.message}`);
        throw error;
    }
};
