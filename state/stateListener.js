// List of listeners subscribed to state changes
const listeners = [];

/**
 * Adds a new listener function that will be triggered when the state changes.
 * @param {Function} listener - The listener function to add.
 */
exports.addListener = (listener) => {
    if (typeof listener === 'function') {
        listeners.push(listener);
        console.log('Listener added successfully.');
    } else {
        console.error('Invalid listener. Must be a function.');
    }
};

/**
 * Removes a listener function from the list of subscribed listeners.
 * @param {Function} listener - The listener function to remove.
 */
exports.removeListener = (listener) => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
        console.log('Listener removed successfully.');
    } else {
        console.error('Listener not found.');
    }
};

/**
 * Notifies all listeners when the state changes.
 * @param {string} key - The state key that was updated.
 * @param {*} value - The new value of the state key.
 */
exports.notifyListeners = (key, value) => {
    console.log(`Notifying listeners about change in state: ${key}`);
    listeners.forEach((listener) => {
        try {
            listener(key, value);
        } catch (error) {
            console.error(`Error in listener function: ${error.message}`);
        }
    });
};

/**
 * Triggers a synchronization event for state changes.
 * This function can be used to synchronize components when specific state changes occur.
 * @param {string} event - The event name (e.g., 'stateChange', 'synchronize').
 * @param {*} data - The data associated with the event.
 */
exports.triggerEvent = (event, data) => {
    console.log(`Triggering event: ${event}`);
    listeners.forEach((listener) => {
        try {
            listener(event, data);
        } catch (error) {
            console.error(`Error in listener function for event ${event}: ${error.message}`);
        }
    });
};
