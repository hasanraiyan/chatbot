import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAT_HISTORY_KEY = '@chat_history';

export const useChatHistory = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const saveMessages = async (messages) => {
    try {
      await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  };

  return { messages, setMessages, saveMessages };
};
