import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton'; // Ensure correct path to CustomButton
import getDirections from '../../utils/DirectionsService/DirectionsService'; // Adjust path as needed

const RouteScreen = () => {
    const [origin, setOrigin] = useState(''); // State to hold origin address
    const [destination, setDestination] = useState(''); // State to hold destination address
    const [routeDetails, setRouteDetails] = useState(null);

    const handleFindRoute = async () => {
        if (!origin || !destination) {
            Alert.alert("Input Required", "Please enter both origin and destination.");
            return;
        }
        const data = await getDirections(origin, destination);
        if (data && data.routes && data.routes.length > 0) {
            setRouteDetails(data.routes[0].legs[0]); // Assumes first route
        } else {
            Alert.alert("No Route Found", "Could not find a route. Please try different locations.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Route Planner</Text>
            <GooglePlacesAutocomplete
                placeholder='Enter origin address'
                onPress={(data, details = null) => {
                    // Update the origin state with the selected address
                    setOrigin(details?.formatted_address);
                }}
                query={{
                    key: 'AIzaSyBxG4pUDKZPON1zIP437uGHK8hj1wdSbMU', // Replace with your actual API key
                    language: 'en',
                }}
                fetchDetails={true}
                styles={{
                    textInputContainer: styles.inputContainer,
                    textInput: styles.textInput,
                }}
            />
            <GooglePlacesAutocomplete
                placeholder='Enter destination address'
                onPress={(data, details = null) => {
                    // Update the destination state with the selected address
                    setDestination(details?.formatted_address);
                }}
                query={{
                    key: 'AIzaSyBxG4pUDKZPON1zIP437uGHK8hj1wdSbMU', // Replace with your actual API key
                    language: 'en',
                }}
                fetchDetails={true}
                styles={{
                    textInputContainer: styles.inputContainer,
                    textInput: styles.textInput,
                }}
            />
            <CustomButton
                text="Find Route"
                onPress={handleFindRoute}
            />
            {routeDetails && (
                <View style={styles.routeDetails}>
                    <Text style={styles.routeText}>Distance: {routeDetails.distance.text}</Text>
                    <Text style={styles.routeText}>Duration: {routeDetails.duration.text}</Text>
                    <Text style={styles.routeText}>Start Address: {routeDetails.start_address}</Text>
                    <Text style={styles.routeText}>End Address: {routeDetails.end_address}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 1, // Reduced margin between inputs
    },
    textInput: {
        height: 50,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    routeDetails: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    routeText: {
        fontSize: 16,
        marginBottom: 5,
    }
});

export default RouteScreen;
