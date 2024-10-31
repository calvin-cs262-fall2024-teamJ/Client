import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';

const NotesBox = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [text, setText] = useState('');

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

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
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
    },
});

export default NotesBox;