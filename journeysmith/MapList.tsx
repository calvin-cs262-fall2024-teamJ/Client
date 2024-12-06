import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp, BaseNavigationContainer } from '@react-navigation/native';

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
  const [showHelp, setShowHelp] = useState(false);

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
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
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

      <Pressable style={styles.helpButton} onPress={() => setShowHelp(true)}>
                    <Text style={styles.helpButtonText}>?</Text>
                </Pressable>


            {showHelp && (
                <View style={styles.helpView}>
                    <Text style={styles.helpText}>
                    Adding a map: To add a map from the map list screen, press on the gray addition symbol. This will open your device’s file system and allow you to select an image file to upload by pressing the file twice, or by selecting the file and pressing select on the bottom right of the file manager window. 
                    "
                    </Text>
                    <Pressable style={styles.closeHelp} onPress={() => setShowHelp(false)}>
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
            )}

    </>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  loginButton: {
    padding: 10,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 10,
    marginLeft: 10,
    position: 'absolute',
    right: width/10,
  },
  loginText: {
    color: '#1B1921',
    fontSize: 28,
    fontFamily: 'Enchanted Land',
  },
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
  closeText: {
    color: '#f5f5dc',
    fontWeight: 'bold',
},
closeHelp: {
    padding: 10,
    position: 'absolute',
    margin: 20,
    top: height/40,
    right: width/40,
    backgroundColor: '#1B1921',
    borderRadius: 100,
},
helpView: {
    backgroundColor: '#rgba(245, 245, 220, 1)',
    width: width/2,
    height: height/2,
    top: height/4,
    right: width/4,
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
    bottom: height/20,
    left: width/20,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 100,
},
helpButtonText: {
    color: '#1B1921',
    fontWeight: 'bold',
},
});

export default MapList;
