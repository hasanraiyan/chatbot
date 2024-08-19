import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewChatIcon from './NewChatIcon'; 

const ChatHeader = ({ onSidebarToggle, onNewChat }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onSidebarToggle} style={styles.iconButton} accessibilityLabel="Toggle Sidebar">
        <Icon name="menu" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Chatbot</Text>
      <TouchableOpacity onPress={onNewChat} style={styles.iconButton} accessibilityLabel="New Chat">
        <NewChatIcon width={24} height={24} fill="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 5,
    backgroundColor:'#f0f0f0',
    elevation: 2,
    marginTop: StatusBar.currentHeight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  iconButton: {
    padding: 10,
  },
});

export default ChatHeader;
