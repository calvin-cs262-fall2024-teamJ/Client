
import React from 'react';
import { View, Image, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import NotesBox from './NotesBox';

type RouteParams = {
    params: {
        imageUri: string;
    };
};

type RootStackParamList = {
    Home: undefined;
    MapList: undefined;
    MapScreen: { imageUri: string };
};

const { width, height } = Dimensions.get('window');

// MapScreen component
const MapScreen = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { imageUri } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    console.log('Received imageUri:', imageUri); // For debugging

    return (
        <>
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : null}
            </View>
            
            <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                <Text style={styles.returnButtonText}>Return to map list</Text>
            </Pressable>
            <NotesBox />
        </>
    );
}

// Styles for the map component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgba(105, 63, 27,1)',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        padding: 10,
    },
    returnButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#rgba(245, 245, 220, 1)',
        borderRadius: 10,
        padding: 8,
    },
    returnButtonText: {
        color: '#000',
        fontFamily: 'Enchanted Land',
        fontSize: 20,
        fontWeight: 'bold',
    },
    pinButton: {
        backgroundColor: '#rgba(245, 245, 220, 1)',
        width: 10,
        height: 10,
        borderRadius: 5,
        borderColor: '#rgba(245, 245, 220, 1)',
    },
    imageContainer: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B1921',
        padding: 10,
    },
});

export default MapScreen;