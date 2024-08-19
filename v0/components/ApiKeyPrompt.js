import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const API_KEY_KEY = '@gemini_api_key';

const ApiKeyPrompt = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // New state for saving process
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const loadApiKey = async () => {
      try {
        const savedApiKey = await AsyncStorage.getItem(API_KEY_KEY);
        if (savedApiKey) {
          setApiKey(savedApiKey);
        }
      } catch (error) {
        console.error('Failed to load API key:', error);
        Alert.alert('Error', 'Failed to load API key.');
      } finally {
        setLoading(false);
      }
    };

    loadApiKey();
  }, []);

  const handleSave = async () => {
    if (apiKey.trim() === '') {
      Alert.alert('Error', 'Please enter a valid API key.');
      return;
    }

    setSaving(true); // Start saving process

    try {
      await AsyncStorage.setItem(API_KEY_KEY, apiKey);
      onClose(); // Close the modal after saving without showing an alert
    } catch (error) {
      Alert.alert('Error', 'Failed to save API key.');
    } finally {
      setSaving(false); // End saving process
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  const handleLinkPress = () => {
    Linking.openURL('https://aistudio.google.com/app/apikey');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Gemini API Key</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter API Key"
          value={apiKey}
          onChangeText={setApiKey}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#888"
          editable={!saving} // Disable input during saving
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
          disabled={saving} // Disable toggle during saving
        >
          <Icon
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLinkPress} style={styles.linkContainer}>
        <Text style={styles.linkText}>
          Click here to generate your free API key.
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, saving && styles.disabledButton]}
          onPress={handleSave}
          disabled={saving} // Disable button during saving
        >
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancelButton, saving && styles.disabledButton]}
          onPress={onClose}
          disabled={saving} // Disable button during saving
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    padding: 10,
  },
  linkContainer: {
    marginBottom: 20, // Space between the link and the elements above or below it
  },
  linkText: {
    color: '#007BFF', // A vibrant blue color, commonly used for links
    textDecorationLine: 'underline', // Underlines the text to indicate it's a link
    fontSize: 16, // Ensures the link text is easily readable
    fontWeight: '500', // Adds slight boldness to the link text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ApiKeyPrompt;
