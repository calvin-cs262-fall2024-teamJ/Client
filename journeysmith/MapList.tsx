import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';

//Define RootStackParamList
type RootStackParamList = {
  Home: undefined;
  MapList: undefined;
  MapScreen: { imageUri: string };
};

function MapList() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width, height } = Dimensions.get('window');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  return (
    <>
      <View style={styles.topBanner}>
        <Image source={require('./assets/logo.png')} style={styles.logo}></Image>
        <Text style={styles.welcomeText}>Journeysmith</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.addButton} onPress={pickImage}>
          <Image
            source={require('./assets/add-map-button.png')}
            style={styles.addButtonImage}
          />
        </Pressable>
        <ScrollView horizontal>
          {selectedImages.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Pressable onPress={() => navigation.navigate('MapScreen', { imageUri })}>
                <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: '#1B1921',
    height: '80%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
  },
  topBanner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '20%',
    backgroundColor: '#1B1921',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 230,
    height: 230,
  },
  welcomeText: {
    fontSize: 50,
    color: '#rgba(245, 245, 220, 1)',
    fontFamily: 'Enchanted Land',
  },
  addButton: {
    width: 150,
    height: 150,
  },
  addButtonImage: {
    width: 150,
    height: 150,
    marginLeft: 30,
  },
  imageContainer: {
    marginLeft: 40,
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: '#rgba(235, 235, 200, 1)',
    borderWidth: 10,
  },
  returnButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 10,
  },
  returnButtonText: {
    color: '#000',
  },
});

export default MapList;
