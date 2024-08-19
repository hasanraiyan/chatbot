// utils/aiResponses.js

/**
 * Generates a simulated AI response based on the user message.
 * 
 * @param {string} userMessage - The message from the user.
 * @returns {Promise<Object>} A promise that resolves to the bot response object.
 * @throws {Error} If the userMessage is invalid.
 */
export const generateAIResponse = (userMessage) => {
  return new Promise((resolve, reject) => {
    // Validate the userMessage
    if (typeof userMessage !== 'string' || userMessage.trim() === '') {
      return reject(new Error('Invalid message'));
    }

    // Simulate a delay in response
    setTimeout(() => {
      const botResponse = {
        _id: Math.random().toString(),
        text: `You said: "${userMessage}". This is a static response from the chatbot.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
          avatar: require('../assets/robot.png'), // Ensure the path is correct
        },
      };
      resolve(botResponse);
    }, 1000); // Simulate a 1-second delay
  });
};
