import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Text, Image } from 'react-native';

const DraggablePin = ({ initialPosition, onDragEnd, draggable }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => draggable,
    onPanResponderGrant: () => {
      if (draggable) {
        setIsDragging(true);
      }
    },
    onPanResponderMove: (e, gestureState) => {
      if (isDragging) {
        setPosition({
          x: gestureState.moveX - 15, // Adjust for centering the pin
          y: gestureState.moveY - 15,
        });
      }
    },
    onPanResponderRelease: () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd(position);
      }
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={[styles.pin, { top: position.y, left: position.x, backgroundColor: isDragging ? 'blue' : 'transparent' }]}
    >
      <Image style={styles.pinImage} source={require('./assets/pinOne.png')} />
    </View>
  );
};

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
