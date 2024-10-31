import React from 'react';
import {View, Image, StyleSheet, Pressable, Text, Dimensions} from 'react-native';
import {useRoute, RouteProp, useNavigation, NavigationProp} from '@react-navigation/native';
import NotesBox from './NotesBox';

type RouteParams={
    params:{
        imageUri: string;
    };
};

type RootStackParamList = {
    Home: undefined;
    MapList: undefined;
    MapScreen: { imageUri: string };
};

// MapScreen component
const MapScreen = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { imageUri } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    console.log('Received imageUri:', imageUri); // For debugging

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image source={{ uri: imageUri }}
                style={styles.image}
                resizeMode='contain'
                />
            ) : null}
            <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                <Text style={styles.returnButtonText}>Return to map list</Text>
            </Pressable>
            <NotesBox /> {/* Allow DM to take notes on the side of the mapscreen */}
        </View>
    );
}

// Styles for the map component
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    image:{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    returnButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        backgroundColor: '#fff',
      },
      returnButtonText: {
        color: '#000',
      },
});

export default MapScreen;