import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

function HomeScreen({ navigation }) {
  
  return (
    <View
      style={styles.background}
    >
      <Image source={require('./assets/logo.png')} style={styles.logo}></Image>
      <Text style={styles.welcomeText}>Welcome to Journeysmith!</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('MapList')}>
        <Text style={styles.buttonText}>Get Started!</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#1B1921',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#rgba(235, 235, 200, 1)',
    fontWeight: 'bold',
    textShadowColor: '#rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 10,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#569A81',
    borderRadius: 5,
    borderColor: 'rgba(235, 235, 200, 1)',
    borderWidth: 3,
  },
  buttonText: {
    color: '#CE774A',
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
    borderColor: 'rgba(105, 63, 27,1)',
    borderWidth: 1,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    color: '#000',
  },
});

export default HomeScreen;