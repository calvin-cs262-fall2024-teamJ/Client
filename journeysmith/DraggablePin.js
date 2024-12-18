import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Text, Image } from 'react-native';

// DraggablePin component definition
const DraggablePin = ({ initialPosition, onDragEnd, draggable }) => {
  // State to store the current position of the pin
  const [position, setPosition] = useState(initialPosition);
  // State to track if the pin is being dragged
  const [isDragging, setIsDragging] = useState(false);

  // PanResponder to handle drag gestures
  const panResponder = PanResponder.create({
    // Determine if the pan responder should start
    onStartShouldSetPanResponder: () => draggable,
    // Handle the start of the pan responder
    onPanResponderGrant: () => {
      if (draggable) {
        setIsDragging(true);
      }
    },
    // Handle the movement of the pan responder
    onPanResponderMove: (e, gestureState) => {
      if (isDragging) {
        setPosition({
          x: gestureState.moveX - 15, // Adjust for centering the pin
          y: gestureState.moveY - 15,
        });
      }
    },
    // Handle the release of the pan responder
    onPanResponderRelease: () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd(position); // Call the onDragEnd callback with the final position
      }
    },
  });

  return (
    // Render the draggable pin
    <View
      {...panResponder.panHandlers}
      style={[styles.pin, { top: position.y, left: position.x, backgroundColor: isDragging ? 'blue' : 'transparent' }]}
    >
      <Image style={styles.pinImage} source={require('./assets/pinOne.png')} />
    </View>
  );
};

// Styles for the draggable pin
const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Make it circular
  },
  pinImage: {
    width: 50,
    height: 50,
  },
});


export default DraggablePin;

