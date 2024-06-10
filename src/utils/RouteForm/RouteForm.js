import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton';

const RouteForm = ({ setRegion, fetchRoute }) => {
    const [stops, setStops] = useState([]);

    const handleAddStop = (details) => {
        if (details) {
            const newStop = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                label: details.formatted_address,
            };
            setStops(prevStops => [...prevStops, newStop]);
            if (stops.length === 0) {
                setRegion({
                    latitude: newStop.latitude,
                    longitude: newStop.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        } else {
            Alert.alert("Error", "Failed to fetch location details. Please try again.");
        }
    };

    const handleRemoveStop = (index) => {
        setStops(prevStops => prevStops.filter((_, idx) => idx !== index));
    };

    return (
        <View style={styles.container}>
            {stops.map((stop, index) => (
                <View key={index} style={styles.stopItem}>
                    <Text style={styles.stopLabel}>{stop.label}</Text>
                    <Button title="Remove" onPress={() => handleRemoveStop(index)} color="#ff6347" />
                </View>
            ))}
            <GooglePlacesAutocomplete
                placeholder='Enter a stop'
                onPress={(data, details = null) => handleAddStop(details)}
                query={{
                    key: 'AIzaSyC5_cY4UTzj7QTkIG3PT8trIrvfvEMF1YQ',
                    language: 'en',
                }}
                fetchDetails={true}
                styles={{
                    textInputContainer: styles.inputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView // Adjust style as needed
                }}
            />
            <CustomButton text="Find Route" onPress={() => fetchRoute(stops)} style={styles.findRouteButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
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
    },
    listView: {
        position: 'absolute',
        top: 52,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        zIndex: 1000,  // Make sure this is rendered above all other components
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
    },
    findRouteButton: {
        marginTop: 10,
    },
});

export default RouteForm;
