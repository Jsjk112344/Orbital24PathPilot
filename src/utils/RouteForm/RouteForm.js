import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton';
import { RouteContext } from '../../context/RouteContext';

const RouteForm = ({ setRegion, fetchRoute, stops, setStops }) => {
    const { currentLocation } = useContext(RouteContext); // Use the context to get the current location
    
    const handleUseMyLocation = () => {
        if (currentLocation && !stops.some(stop => stop.label === currentLocation.label)) {
            setStops([currentLocation, ...stops]);
            setRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    };

    return (
        <View style={styles.container}>
            {stops.map((stop, index) => (
                <View key={index} style={styles.stopItem}>
                    <Text style={styles.stopLabel}>{stop.label}</Text>
                    <Button title="Remove" onPress={() => setStops(stops.filter((_, idx) => idx !== index))} color="#ff6347" />
                </View>
            ))}
            <GooglePlacesAutocomplete
                placeholder='Enter a stop'
                onPress={(data, details = null) => {
                    if (details) {
                        const newStop = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            label: details.formatted_address,
                        };
                        setStops([...stops, newStop]);
                    }
                }}
                query={{
                    key: 'AIzaSyDDiOFzvaeBEkHd8BQFIG29jNXDI-GAx_0',
                    language: 'en',
                }}
                fetchDetails={true}
                styles={{
                    textInputContainer: styles.inputContainer,
                    textInput: styles.textInput,
                    description: styles.description, // Ensures the color of the suggested place names is consistent
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
                textInputProps={{
                    placeholderTextColor: '#888888', // Explicitly setting the placeholder text color
                }}
            />
            <CustomButton text="Use My Location" onPress={handleUseMyLocation} />
            <CustomButton text="Create Trip" onPress={() => fetchRoute(stops)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    stopItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
    },
    stopLabel: {
        flex: 1,
        color: '#333', // Explicitly setting the text color
    },
    inputContainer: {
        padding: 0,
        backgroundColor: 'white',
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#333', // Explicitly setting the text color
    },
    description: {
        color: '#333', // Ensuring the color of the suggested place names is consistent
    },
});

export default RouteForm;
