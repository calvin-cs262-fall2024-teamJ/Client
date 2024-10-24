import React from 'react';
import { ImageBackground, View, Text, Pressable, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/home-screen-map.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to Journeysmith!</Text>
      </View>
        <Pressable style={styles.button} onPress={() => navigation.navigate("MapList")}>
          <Text style={styles.buttonText}>Go to Map List</Text>
        </Pressable>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Optional: Adds a semi-transparent overlay
  },
  welcomeText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default HomeScreen;