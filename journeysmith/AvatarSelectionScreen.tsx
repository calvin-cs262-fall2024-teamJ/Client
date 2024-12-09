import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Image, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const DraggablePin = ({ avatarUri, initialPosition, onDragEnd }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
    },
    onPanResponderMove: (e, gestureState) => {
      if (isDragging) {
        setPosition({
          x: gestureState.moveX - 25, // Adjust for centering the pin
          y: gestureState.moveY - 25,
        });
      }
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      onDragEnd(position);
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.pin,
        {
          top: position.y,
          left: position.x,
          backgroundColor: isDragging ? 'blue' : 'transparent',
        },
      ]}
    >
      <Image style={styles.pinImage} source={{ uri: avatarUri }} />
    </View>
  );
};

const AvatarSelectionScreen = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [avatarPositions, setAvatarPositions] = useState<any[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar(result.assets[0].uri);
    }
  };

  const addAvatar = () => {
    if (selectedAvatar) {
      const newAvatarPosition = {
        avatarUri: selectedAvatar,
        position: { x: width / 2, y: height / 2 }, // Default position
      };
      setAvatars([...avatars, selectedAvatar]);
      setAvatarPositions([...avatarPositions, newAvatarPosition]);
    }
  };

  const handleDragEnd = (index: number, newPosition: any) => {
    const updatedPositions = [...avatarPositions];
    updatedPositions[index].position = newPosition;
    setAvatarPositions(updatedPositions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSelection}>
        <Pressable onPress={pickImage} style={styles.selectAvatarButton}>
          <Text style={styles.selectAvatarText}>Choose Avatar</Text>
        </Pressable>
        {selectedAvatar && (
          <Pressable onPress={addAvatar} style={styles.addAvatarButton}>
            <Text style={styles.selectAvatarText}>Add Avatar</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.scrollContainer}>
        {avatarPositions.map((avatar, index) => (
          <DraggablePin
            key={index}
            avatarUri={avatar.avatarUri}
            initialPosition={avatar.position}
            onDragEnd={(newPosition) => handleDragEnd(index, newPosition)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSelection: {
    marginTop: 30,
    flexDirection: 'row',
  },
  selectAvatarButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  addAvatarButton: {
    backgroundColor: '#28a745',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  selectAvatarText: {
    color: '#fff',
    fontSize: 18,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  pin: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Make it circular
  },
  pinImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default AvatarSelectionScreen;
