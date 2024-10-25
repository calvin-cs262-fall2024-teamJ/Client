import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';

//Define RootStackParamList
type RootStackParamList = {
  Home: undefined;
  MapList: undefined;
  MapScreen: { imageUri: string };
};

function MapList() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.topLeftButton} onPress={pickImage}>
        <Image
          source={require('./assets/add-map-button.png')}
          style={styles.profileImage}
        />
      </Pressable>
      <Pressable>
        {selectedImage && (
          <Pressable onPress={() => navigation.navigate('MapScreen', {imageUri: selectedImage})}>
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
          </Pressable>
        )}
      </Pressable>
      <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
        <Text style={styles.returnButtonText}>Return to home screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(50, 50, 50, 1)',
  },
  topLeftButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  uploadedImage: {
    width: 200,
    height: 200,
  },
  returnButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  returnButtonText: {
    color: '#000',
  },
});

export default MapList;