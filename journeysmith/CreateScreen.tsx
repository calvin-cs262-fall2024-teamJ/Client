import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

const CreateScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showHelp, setShowHelp] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const fetchDungeonMasterData = async () => {
        try {
            const response = await fetch('https://journeysmithwebbapp-f5azf8edebaqarcc.canadacentral-01.azurewebsites.net/dungeonmasters/');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching dungeon master data:', error);
            return null;
        }
    };

    const handleCreateAccount = async () => {
        const dungeonMasters = await fetchDungeonMasterData();
        if (!dungeonMasters) {
            Alert.alert('Account Creation Failed', 'Unable to fetch dungeon master data');
            return;
        }

        const existingUser = dungeonMasters.find(dm => dm.nickname === username);
        if (existingUser) {
            Alert.alert('Account Creation Failed', 'Username already exists');
            return;
        }

        try {
            const response = await fetch('https://journeysmithwebbapp-f5azf8edebaqarcc.canadacentral-01.azurewebsites.net/dungeonmasters/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nickname: username,
                    loginid: username,
                    password: password,
                }),
            });

            if (response.ok) {
                Alert.alert('Account Created', 'Your account has been created successfully');
                navigation.navigate('Login');
            } else {
                Alert.alert('Account Creation Failed', 'There was an error creating your account');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            Alert.alert('Account Creation Failed', 'There was an error creating your account');
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Create Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor='#f5f5dc'
                    value={username}
                    onChangeText={setUsername}
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
                <Pressable style={styles.button} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
                <Pressable style={styles.helpButton} onPress={() => setShowHelp(true)}>
                    <Text style={styles.helpButtonText}>?</Text>
                </Pressable>
            </View>

            {showHelp && (
                <View style={styles.helpView}>
                    <Text style={styles.helpText}>
                    To create an account, enter your desired username and password, then press the "Create Account" button below.
                    </Text>
                    <Pressable style={styles.closeHelp} onPress={() => setShowHelp(false)}>
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
            )}
        </>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    closeText: {
        color: '#f5f5dc',
        fontWeight: 'bold',
    },
    closeHelp: {
        padding: 10,
        position: 'absolute',
        margin: 20,
        top: height / 40,
        right: width / 40,
        backgroundColor: '#1B1921',
        borderRadius: 100,
    },
    helpView: {
        backgroundColor: '#rgba(245, 245, 220, 1)',
        width: width / 2,
        height: height / 2,
        top: height / 4,
        right: width / 4,
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
        bottom: height / 20,
        left: width / 20,
        backgroundColor: '#rgba(245, 245, 220, 1)',
        borderRadius: 100,
    },
    helpButtonText: {
        color: '#1B1921',
        fontWeight: 'bold',
    },
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

export default CreateScreen;