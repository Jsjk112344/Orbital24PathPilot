import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import RouteForm from '../../utils/RouteForm/RouteForm';
import useRouteLogic from '../../utils/useRouteLogic/useRouteLogic';
import { useNavigation } from '@react-navigation/native';
import DateTimeForm from '../../utils/DateTimeForm/DateTimeForm';
import CustomInput from '../../components/CustomInput';
import { RouteContext } from '../../context/RouteContext';

const InputStops = () => {
    const { stops, setStops, fetchAndSetRoute, region, setRegion } = useRouteLogic();
    const [tripName, setTripName] = useState('');
    const navigation = useNavigation();

    // Function to update the trip info in the context


    const handleFetchRoute = async () => {
        try {
            const result = await fetchAndSetRoute(); // Assume fetchAndSetRoute resolves to a result indicating success/failure
            
            if (result.success) { // Check if the function was successful
                navigation.navigate('NewTrip', { tripName, date: new Date() }); // Navigate only if successful
            } else {
                Alert.alert("Error", "Failed to fetch route details."); // Provide a more specific error message
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <ScrollView 
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps='handled'
            style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Trip</Text>  

            <View style={styles.formContainer}>
                <DateTimeForm/>
            </View>
            <View style={styles.formContainer}>
                <RouteForm
                    fetchRoute={handleFetchRoute}
                    setRegion={setRegion}
                    stops={stops}
                    setStops={setStops}
                    currentLocation={region}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    headerTitle: {
        fontSize: 24,  // Larger font size for the title
        fontWeight: 'bold',  // Make the font bold
        color: '#333',  // Dark color for better readability
        alignSelf: 'center',  // Center align the title
        marginVertical: 20,  // Add vertical margin for spacing
    },
    formContainer: {
        flex: 1,
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});

export default InputStops;
