import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        // Add your login logic here
        if (email === 'test@example.com' && password === 'password') {
            navigation.navigate('MapList');
        } else {
            Alert.alert('Login Failed', 'Invalid email or password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor='#f5f5dc'
                value={email}
                onChangeText={setEmail}
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
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#rgba(245, 245, 220, 1)',
        borderRadius: 5,
        alignItems: 'center',
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
});

export default LoginScreen;