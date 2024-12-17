
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
                <Text style={styles.returnButtonText}>Return to Map List</Text>
            </Pressable>
            <NotesBox />

             <Pressable style={styles.helpButton} onPress={() => setShowHelp(true)}>
                    <Text style={styles.helpButtonText}>?</Text>
                </Pressable>


            {showHelp && (
                <View style={styles.helpView}>
                    <Text style={styles.helpText}>
                    Placing a pin:{"\n"} To place a pin, press the button labeled "Place Pin," then press on the map where you
                    want the pin to appear.{"\n"}

                    {"\n"}Writing notes to a pin:{"\n"} Press the desired pin, then select the pencil icon from the menu that appears. 
                    Enter your text into the box, then select "Save." The pencil icon is the first icon from the left in the menu.{"\n"}

                    {"\n"}Viewing notes on a pin:{"\n"} Press the desired pin, then select the eye icon from the menu that appears. 
                    The eye icon is the second icon from the left in the menu.{"\n"}

                    {"\n"}Moving a pin:{"\n"} Press the desired pin, then select the four-sided arrow icon from the menu that appears. 
                    Drag the pin to your desired location. The arrow icon is the third icon from the left in the menu. {"\n"}

                    {"\n"}Deleting a pin:{"\n"} Press the desired pin, then select the trash can icon from the menu that appears. 
                    Confirm the deletion by selecting "Delete." The trash icon is the fourth icon from the left in the menu.{"\n"}

                    {"\n"}View all maps:{"\n"} On the Map Screen, in the top left corner, select the "Return to Map List" button to
                    view all campaigns in your account.{"\n"}

                    {"\n"}Add general notes to a map:{"\n"} Press the toggle notes button located in the top right corner to open 
                    the notes menu. Enter your notes in the box that appears below the "Toggle Notes Box" button.{"\n"}
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
        zIndex: 25,
    },
    closeHelp: {
        padding: 10,
        position: 'absolute',
        margin: 20,
        top: 3,
        right: 3,
        backgroundColor: '#1B1921',
        borderRadius: 100,
        zIndex: 25,
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
        zIndex: 25,
    },
    helpText: {
        color: '#1B1921',
        fontSize: 16,
        textAlign: 'center',
        zIndex: 25,
    },
    helpButton: {
        padding: 10,
        position: 'absolute',
        margin: 20,
        bottom: height/50,
        left: width/50,
        backgroundColor: '#rgba(245, 245, 220, 1)',
        borderRadius: 100,
        zIndex: 25,
    },
    helpButtonText: {
        color: '#1B1921',
        fontWeight: 'bold',
        zIndex: 25,
    },
});

export default MapScreen;