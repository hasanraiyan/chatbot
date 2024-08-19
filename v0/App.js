import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Modal, Animated } from 'react-native';
import { GiftedChat, Send, TypingIndicator, InputToolbar } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatHeader from './components/ChatHeader';
import { useChatHistory } from './hooks/useChatHistory';
import { handleNewChat } from './utils/chatActions';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import { fadeOutAndSlideUp, fadeInAndSlideDown } from './utils/animations'; // Import animations
import { generateAIResponse } from './utils/aiResponses'; // Import AI response function

export default function App() {
  const { messages, setMessages, saveMessages } = useChatHistory();
  const [isTyping, setIsTyping] = useState(false);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1)); // Animated value for fade effect
  const [slideAnim] = useState(new Animated.Value(0)); // Animated value for slide effect
  const [animating, setAnimating] = useState(false); // Track if animation is in progress
  const [loading, setLoading] = useState(false); // Loading state for disabling input
  const [apiKey, setApiKey] = useState(''); // State to store the API key

  const handleSend = async (newMessages) => {
    if (loading) return; // Prevent sending if already loading

    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);
    await saveMessages(updatedMessages);

    setIsTyping(true);
    setLoading(true); // Set loading to true when AI is generating a response

    const userMessage = newMessages[0].text;

    try {
      const botResponse = await generateAIResponse(userMessage, apiKey);

      const updatedMessagesWithBot = GiftedChat.append(updatedMessages, botResponse);
      setMessages(updatedMessagesWithBot);
      saveMessages(updatedMessagesWithBot);
    } catch (error) {
      // Handle any errors that occur during response generation
      console.error('Error handling AI response:', error);
    } finally {
      setIsTyping(false);
      setLoading(false); // Reset loading state
    }
  };

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendContainer}>
        <Icon name="send" size={24} color="#007AFF" />
      </View>
    </Send>
  );

  const handleSidebarToggle = () => {
    setShowApiKeyPrompt(true);
  };

  const handleNewChatClick = async () => {
    if (animating) return;
    setAnimating(true);

    // Start the fade out and slide up animation
    fadeOutAndSlideUp(fadeAnim, slideAnim).start(async () => {
      await handleNewChat(setMessages);

      // Reset animation values for the new chat messages
      fadeAnim.setValue(0);
      slideAnim.setValue(50);

      // Fade in and slide down the new messages
      fadeInAndSlideDown(fadeAnim, slideAnim).start(() => {
        setAnimating(false);
      });
    });
  };

  const closeApiKeyPrompt = (key) => {
    if (key) setApiKey(key); // Save the API key if provided
    setShowApiKeyPrompt(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <ChatHeader
        onSidebarToggle={handleSidebarToggle}
        onNewChat={handleNewChatClick}
      />
      <Animated.View style={[styles.chatContainer, {
        opacity: fadeAnim,
        transform: [{
          translateY: slideAnim,
        }]
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
              isDisabled={loading} // Disable input toolbar when loading
            />
          )}
        />
      </Animated.View>
      <Modal
        visible={showApiKeyPrompt}
        transparent={true}
        animationType="slide"
        onRequestClose={() => closeApiKeyPrompt(null)}
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
