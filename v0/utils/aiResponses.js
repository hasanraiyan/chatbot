// utils/aiResponses.js

export const generateAIResponse = (userMessage) => {
  return new Promise((resolve, reject) => {
    if (typeof userMessage !== 'string' || userMessage.trim() === '') {
      return reject(new Error('Invalid message'));
    }

    setTimeout(() => {
      const botResponse = {
        _id: Math.random().toString(),
        text: `You said: "${userMessage}". This is a static response from the chatbot.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
          avatar: require('../assets/robot.png'),
        },
      };
      resolve(botResponse);
    }, 1000); // Simulate a delay in response
  });
};
