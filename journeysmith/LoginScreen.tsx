import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

const LoginScreen = () => {
    // State to store email input
    const [email, setEmail] = useState('');
    // State to store password input
    const [password, setPassword] = useState('');
    // State to control the visibility of the help modal
    const [showHelp, setShowHelp] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Handle login button press
    const handleLogin = () => {
        if (email === 'test@example.com' && password === 'password') {
            // Navigate to MapList screen on successful login
            navigation.navigate('MapList');
        } else {
            // Show alert on login failure
            Alert.alert('Login Failed', 'Invalid email or password');
        }
    };

    return (
        <>
            <View style={styles.container}>
                {/* Login Fields */}
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

                {/* Login Button */}
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                
                {/* Help Button */}
                <Pressable style={styles.helpButton} onPress={() => setShowHelp(true)}>
                    <Text style={styles.helpButtonText}>?</Text>
                </Pressable>

                
            </View>

            {/* Help text */}
            {showHelp && (
                <View style={styles.helpView}>
                    <Text style={styles.helpText}>
                    Logging in:{"\n"}To log in to the app, enter the email address you used to create your account in the 'Email' field. 
                    Enter your password in the 'Password' field, then press the 'Login' button below.
                    </Text>
                    <Pressable style={styles.closeHelp} onPress={() => setShowHelp(false)}>
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
            )}

        </>
    );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    closeText: {
        color: '#f5f5dc',
        fontWeight: 'bold',
    },
    closeHelp: {
        padding: 10,
        position: 'absolute',
        margin: 20,
        top: 3,
        right: 3,
        backgroundColor: '#1B1921',
        borderRadius: 100,
    },
    helpView: {
        backgroundColor: '#rgba(245, 245, 220, 1)',
        width: width,
        height: height,
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 10,
        borderColor: '#1B1921',
        borderWidth: 2,
    },
    helpText: {
        color: '#1B1921',
        fontSize: 16,
        textAlign: 'center',
    },
    helpButton: {
        padding: 10,
        position: 'absolute',
        margin: 20,
        bottom: height/50,
        left: width/50,
        backgroundColor: '#rgba(245, 245, 220, 1)',
        borderRadius: 100,
    },
    helpButtonText: {
        color: '#1B1921',
        fontWeight: 'bold',
    },
    // Login button
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