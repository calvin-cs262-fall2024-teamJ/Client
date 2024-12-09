import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  MapList: undefined;
  MapScreen: { imageUri: string };
  AvatarSelection: undefined;
};

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const avatars = [
    { uri: 'https://example.com/avatar1.png', id: 1 },
    { uri: 'https://example.com/avatar2.png', id: 2 },
    { uri: 'https://example.com/avatar3.png', id: 3 },
  ];

  const selectAvatar = (avatarUri: string) => {
    setSelectedAvatar(avatarUri);
    // Navigate back to the MapScreen and pass the selected avatar
    navigation.navigate('MapScreen', { imageUri: avatarUri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Avatar</Text>
      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <Pressable key={avatar.id} onPress={() => selectAvatar(avatar.uri)}>
            <Image source={{ uri: avatar.uri }} style={styles.avatar} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1921',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  avatar: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 40,
  },
});

export default AvatarSelection;
