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
  const [saving, setSaving] = useState(false);
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

    setSaving(true);

    try {
      await AsyncStorage.setItem(API_KEY_KEY, apiKey);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save API key.');
    } finally {
      setSaving(false);
    }
  };

  const handleLinkPress = () => {
    Linking.openURL('https://aistudio.google.com/app/apikey');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

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
          editable={!saving}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(prev => !prev)}
          style={styles.eyeIcon}
          disabled={saving}
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
          disabled={saving}
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
          disabled={saving}
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
    backgroundColor: '#f0f0f5',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    padding: 10,
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: '500',
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
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ApiKeyPrompt;
