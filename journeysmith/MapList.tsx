import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions, ScrollView, TextInput, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp, BaseNavigationContainer } from '@react-navigation/native';

// Define RootStackParamList
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
  const [imageNames, setImageNames] = useState<{ [key: string]: string }>({});
  const [editingText, setEditingText] = useState<string | null>(null);
  const [textColors, setTextColors] = useState<{ [key: string]: string }>({}); // Store text colors for each input
  const [showConfirm, setShowConfirm] = useState<number | null>(null); // Store the index of the image to be deleted

  const handleTextChange = (text: string, index: number) => {
    setImageNames({ ...imageNames, [index]: text });
    setTextColors({ ...textColors, [index]: 'white' }); // Set a constant color
  };

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

  const deleteImage = (index: number) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    const newImageNames = { ...imageNames };
    delete newImageNames[index];
    const newTextColors = { ...textColors };
    delete newTextColors[index];
    setSelectedImages(newSelectedImages);
    setImageNames(newImageNames);
    setTextColors(newTextColors);
    setShowConfirm(null); // Close the confirmation modal
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
              <Pressable onPress={() => setEditingText(index.toString())}>
                {editingText === index.toString() ? (
                  <TextInput
                    style={[styles.textInput, { color: textColors[index] || '#1B1921' }]} // Apply constant text color
                    value={imageNames[index] || ''}
                    onChangeText={(text) => handleTextChange(text, index)}
                    onBlur={() => setEditingText(null)}
                    autoFocus
                  />
                ) : (
                  <Text style={styles.text}>{imageNames[index] || 'Click to edit'}</Text>
                )}
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={() => setShowConfirm(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
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
            Adding a map:{"\n"} To add a map from the map list screen, press the large plus (+) symbol. This will open your device’s 
            file system, allowing you to choose an image file. You can select the file by double-clicking it, or by selecting it 
            and clicking 'Select' in the bottom-right corner of the file manager window.
          </Text>
          <Pressable style={styles.closeHelp} onPress={() => setShowHelp(false)}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      )}

      {showConfirm !== null && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showConfirm !== null}
          onRequestClose={() => setShowConfirm(null)}
        >
          <View style={styles.textInputContainer}>
            <View style={styles.deleteBox}>
              <Text style={styles.modalText}>Are you sure you want to delete this image?</Text>
              <View style={styles.rowFlex}>
                <Pressable style={styles.cancelButton} onPress={() => setShowConfirm(null)}>
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable style={styles.confirmDeleteButton} onPress={() => deleteImage(showConfirm)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  loginButton: {
    padding: 10,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 10,
    marginLeft: 10,
    position: 'absolute',
    right: width / 10,
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
    marginLeft: 30,
  },
  addButtonImage: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    marginLeft: 40,
    alignItems: 'center',
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: '#rgba(235, 235, 200, 1)',
    borderWidth: 10,
  },
  textInput: {
    width: 150,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    width: 150,
    height: 40,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 40,
    backgroundColor: '#rgba(235, 235, 200, 1)',
    borderRadius: 5,
    color: '#1B1921',
    fontSize: 12,
    fontFamily: 'Enchanted Land',
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#rgba(255, 0, 0, 1)',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'black',
    textAlign: 'center',
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
    top: 3,
    right: 3,
    backgroundColor: '#1B1921',
    borderRadius: 100,
  },
  helpView: {
    backgroundColor: '#rgba(245, 245, 220, 1)',
    width: width,
    height: height,
    top: 0,
    right: 0,
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
    bottom: height / 50,
    left: width / 50,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 100,
  },
  helpButtonText: {
    color: '#1B1921',
    fontWeight: 'bold',
  },
  textInputContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteBox: {
    width: 300,
    height: 100,
    backgroundColor: '#1B1921',
    borderRadius: 10,
    borderColor: '#rgba(245, 245, 220, 1)',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: '#rgba(245, 245, 220, 1)',
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    borderRadius: 5,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    padding: 10,
    flexDirection: 'row',
    margin: 10,
  },
  confirmDeleteButton: {
    borderRadius: 5,
    backgroundColor: '#rgba(255, 0, 0, 1)',
    padding: 10,
    flexDirection: 'row',
    margin: 10,
  }
});

export default MapList;