import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';

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
            <Button title={isVisible ? 'Hide notes' : 'Show notes'} onPress={toggleVisibility} />
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
        width: '100%',
        height: 1200,
        textAlignVertical: 'top', 
        textAlign: 'left', 
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10, 
        backgroundColor: 'white',
    },
});

export default NotesBox;