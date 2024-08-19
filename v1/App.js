import React, { useState, useCallback, useRef } from 'react';
import { View, StatusBar, Modal, Animated, StyleSheet, Alert } from 'react-native';
import { GiftedChat, Send, TypingIndicator, InputToolbar } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatHeader from './components/ChatHeader';
import { useChatHistory } from './hooks/useChatHistory';
import { handleNewChat } from './utils/chatActions';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import { fadeOutAndSlideUp, fadeInAndSlideDown } from './utils/animations';
import { generateAIResponse } from './utils/aiResponses';

export default function App() {
  const { messages, setMessages, saveMessages } = useChatHistory();
  const [isTyping, setIsTyping] = useState(false);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  

const handleSend = useCallback(async (newMessages) => {
  if (loading) return;

  const updatedMessages = GiftedChat.append(messages, newMessages);
  setMessages(updatedMessages);
  await saveMessages(updatedMessages);

  setIsTyping(true);
  setLoading(true);

  const userMessage = newMessages[0].text;

  try {
    const botResponse = await generateAIResponse(userMessage, apiKey);
    if (botResponse) {
      const updatedMessagesWithBot = GiftedChat.append(updatedMessages, botResponse);
      setMessages(updatedMessagesWithBot);
      await saveMessages(updatedMessagesWithBot);
    } else {
      throw new Error('Invalid response from AI');
    }
  } catch (error) {
    console.error('Error handling AI response:', error);
    Alert.alert('Error', 'Failed to get response from AI. Please try again.');
  } finally {
    setIsTyping(false);
    setLoading(false);
  }
}, [loading, messages, apiKey, saveMessages, setMessages]);


const renderSend = useCallback(
  (props) => (
    <Send {...props}>
      <View style={styles.sendContainer}>
        <Icon
          name="send"
          size={24}
          color="#007AFF"
          accessibilityLabel="Send message"
        />
      </View>
    </Send>
  ),
  []
);


  const handleNewChatClick = useCallback(async () => {
    if (animating) return;
    setAnimating(true);

    fadeOutAndSlideUp(fadeAnim, slideAnim).start(async () => {
      await handleNewChat(setMessages);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      fadeInAndSlideDown(fadeAnim, slideAnim).start(() => {
        setAnimating(false);
      });
    });
  }, [animating, fadeAnim, slideAnim, setMessages]);

  const closeApiKeyPrompt = useCallback((key) => {
    if (key) setApiKey(key);
    setShowApiKeyPrompt(false);
  }, []);

  const handleModalClose = useCallback(() => closeApiKeyPrompt(null), [closeApiKeyPrompt]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <ChatHeader
        onSidebarToggle={() => setShowApiKeyPrompt(true)}
        onNewChat={handleNewChatClick}
      />
      <Animated.View style={[styles.chatContainer, {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }]}>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{ _id: 1 }}
          renderSend={renderSend}
          isTyping={isTyping ? <TypingIndicator /> : null}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={styles.inputToolbar}
              isDisabled={loading}
            />
          )}
        />
      </Animated.View>
      <Modal
        visible={showApiKeyPrompt}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackground}>
          <ApiKeyPrompt onClose={closeApiKeyPrompt} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sendContainer: {
    marginRight: 10,
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  inputToolbar: {
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
