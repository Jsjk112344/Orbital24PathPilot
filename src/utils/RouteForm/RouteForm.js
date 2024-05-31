import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton';

const RouteForm = ({ setOrigin, setDestination, setRegion, fetchRoute }) => {
    return (
        <View style={styles.container}> 
            <GooglePlacesAutocomplete
                    placeholder='Enter origin address'
                    onPress={(data, details = null) => {
                        // Log details to see if data is being fetched correctly
                        console.log(details);

                        if (details) {
                            const lat = details.geometry.location.lat;
                            const lng = details.geometry.location.lng;
                            setOrigin({ latitude: lat, longitude: lng });
                            setRegion({
                                latitude: lat,
                                longitude: lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            });
                        } else {
                            Alert.alert("Error", "Failed to fetch location details. Please try again.");
                        }
                    }}
                    query={{
                        key: 'AIzaSyC5_cY4UTzj7QTkIG3PT8trIrvfvEMF1YQ',
                        language: 'en',
                    }}
                    fetchDetails={true}
                    styles={{
                        textInputContainer: styles.inputContainer,
                        textInput: styles.textInput,
                    }}
            />
            <GooglePlacesAutocomplete
                placeholder='Enter Destination Address'
                onPress={(data, details = null) => {
                    console.log(details);

                    if (details) {
                        const lat = details.geometry.location.lat;
                        const lng = details.geometry.location.lng;
                        setDestination({ latitude: lat, longitude: lng });
                    } else {
                        Alert.alert("Error", "Failed to fetch location details. Please try again.");
                    }
                }}
                query={{
                    key: 'AIzaSyC5_cY4UTzj7QTkIG3PT8trIrvfvEMF1YQ',
                    language: 'en',
                }}
                fetchDetails={true}
                styles={{
                    textInputContainer: styles.inputContainer,
                    textInput: styles.textInput,
                }}
            />              
            <CustomButton style={styles.button} text="Find Route" onPress={fetchRoute}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        padding: 5,
        backgroundColor: 'white',
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },

});

export default RouteForm;
