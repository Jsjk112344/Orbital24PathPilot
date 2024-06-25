import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import RouteForm from '../../utils/RouteForm/RouteForm';
import useRouteLogic from '../../utils/useRouteLogic/useRouteLogic';
import { useNavigation } from '@react-navigation/native';
import DateTimeForm from '../../utils/DateTimeForm/DateTimeForm';


const InputStops = () => {
    const { stops, setStops, fetchAndSetRoute, region, setRegion} = useRouteLogic();
    const navigation = useNavigation();
    const handleFetchRoute = async () => {
        try {
            await fetchAndSetRoute();  // Fetch the route data
            navigation.navigate('NewTrip');  // Navigate and pass data

        } catch (error) {
            Alert.alert("Error", error.message); // Display error message if something goes wrong
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
            <View style={styles.formContainer}>
                <DateTimeForm/>
            </View>
            <View style={styles.formContainer}>
                <RouteForm
                    fetchRoute={handleFetchRoute}
                    setRegion={setRegion}
                    stops={stops}
                    setStops={setStops}
                    currentLocation={region}  // Assuming you want to pass the current region as the location
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,  // Padding around the entire container for consistency
    },
    button: {
        padding: 10,
        backgroundColor: '#ddd',  // A blue color for the button, as in the NewTrip screen
        borderRadius: 5,
        marginBottom: 10,  // Adding some margin below the button for spacing
        alignSelf: 'flex-start',  // Align the button to the start of the flex container
    },
    buttonText: {
        fontSize: 16,
        color: '#000',  // White text color for better contrast on the blue background
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        marginTop: 20,  // Top margin to provide spacing above the form
    }
});

export default InputStops;
