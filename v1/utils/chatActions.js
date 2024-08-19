// utils/chatActions.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAT_HISTORY_KEY = '@chat_history';

/**
 * Initiates a new chat by clearing the chat history from AsyncStorage and resetting the state.
 * 
 * @param {Function} setMessages - Function to update the chat messages in the state.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const handleNewChat = async (setMessages) => {
  try {
    // Validate that setMessages is a function
    if (typeof setMessages !== 'function') {
      throw new TypeError('setMessages must be a function');
    }

    // Clear the stored chat history
    await AsyncStorage.removeItem(CHAT_HISTORY_KEY);

    // Reset the messages in the state
    setMessages([]); // Ensure this does not trigger additional updates

    console.log('New chat initiated: Chat history cleared and new chat started.');
  } catch (error) {
    console.error('Failed to initiate new chat:', error);

    // Optionally provide user feedback here
    // Example: Alert.alert('Error', 'Failed to start a new chat. Please try again.');
  }
};
