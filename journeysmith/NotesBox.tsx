import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Pressable, Dimensions, useWindowDimensions } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// Component to display a text box for notes.
const NotesBox = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [text, setText] = useState('');

    

    //Allow users to toggle visibility off and on
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    //Display the notes box and show/hide button
    return (
        <View style={styles.container}>
            <Pressable onPress={toggleVisibility}>
                <Text style={styles.textBoxButton}>Toggle Notes Box</Text>
            </Pressable>
            {isVisible && (
                <TextInput
                    style={styles.textBox}
                    placeholder="Enter notes here..."
                    value={text}
                    onChangeText={setText}
                    multiline
                    textAlignVertical="top" 
                    textAlign="left" 
                />
            )}
        </View>
    );
};

const { width, height } = Dimensions.get('window');

// Styles for the notes box component(Subject to change)
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 300,
        padding: 10,
    },
    textBox: {
        width: 300,
        height: height-45,
        textAlignVertical: 'top', 
        textAlign: 'left', 
        borderColor: '#1B1921',
        borderWidth: 3,
        padding: 10, 
        backgroundColor: 'white',
        position: 'relative',
        top: -40,
        right: 0,
    },
    textBoxButton: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#1B1921',
        borderWidth: 3,
        position: 'relative',
        top: -40,
        right: 0,
        height: 45,
        width: 300,
    },
});

export default NotesBox;