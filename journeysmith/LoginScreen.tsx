import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
  const [loginid, setLoginid] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log('Login button pressed');
    setIsError(false);
    setErrorMessage('');

    if (!loginid || !password) {
      setIsError(true);
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('journeysmithwebbapp-f5azf8edebaqarcc.canadacentral-01.azurewebsites.net/login', { loginid, password });
      console.log('Response:', response.data);
      if (response.data.success) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate('MapList');  
      } else {
        setIsError(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor='#f5f5dc'
        value={loginid}
        onChangeText={setLoginid}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='#f5f5dc'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Pressable style={[styles.button, isError && styles.errorButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 5,
    alignItems: 'center',
  },
  errorButton: {
    backgroundColor: '#FF6347', // Tomato red for error indication
  },
  buttonText: {
    color: '#rgba(105, 63, 27, 1)',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1B1921',
  },
  title: {
    fontSize: 54,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Enchanted Land',
    color: '#rgba(245, 245, 220, 1)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#f5f5dc',
  },
  errorText: {
    color: '#FF6347',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;
