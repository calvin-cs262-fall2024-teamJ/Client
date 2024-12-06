
import React, { useState } from 'react';
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
    const [showHelp, setShowHelp] = useState(false);

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

            <Pressable style={styles.helpButton} onPress={() => setShowHelp(true)}>
                    <Text style={styles.helpButtonText}>?</Text>
                </Pressable>


            {showHelp && (
                <View style={styles.helpView}>
                    <Text style={styles.helpText}>
                    Placing a pin: To add a pin, press the button labelled place pin and press the map to add a pin where you press.

Writing notes to a pin: Press the desired pin, then select the pencil icon in the menu that appears. Enter text into the box, and select save. The pencil icon is the first icon on the left.

Viewing notes on a pin: Press the desired pin, then select the eye icon in the menu that appears. The eye icon is the second icon from the left.

Deleting a pin: Press the desired pin, then press the trash can icon in the menu that appears. Select confirm. The trash icon is the third icon from the left.

Moving a pin:
Press the desired pin, then press the four sided arrow icon in the menu that appears. Then drag the pin to anywhere you desire. The arrow icon is the fourth icon from the left. 

View all maps:
When on the Map Screen, in the top left corner there will be button “Return to map list”
The Map list displays all maps.

Add general notes to a map: Press the toggle notes button to open the notes menu. Then enter your notes in the box that appears.

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

export default MapScreen;