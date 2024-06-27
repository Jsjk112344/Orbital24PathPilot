import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import TransitDetails from '../../components/TransitDetails';
import TripDetails from '../../components/TripDetails/TripDetails';
import { fetchTripById } from '../../utils/SQLite/SQLite';
import { RouteContext } from '../../context/RouteContext';

const TripView = () => {
    const { setRouteDetails } = useContext(RouteContext);
    const navigation = useNavigation();
    const route = useRoute();
    const { trip } = route.params;

    const [tripDetails, setTripDetails] = useState(null);

    useEffect(() => {
        const loadTripDetails = async () => {
            try {
                const dbTrip = await fetchTripById(trip.id);
                setTripDetails(dbTrip);
                setRouteDetails({
                    coordinates: [], // Set this as needed
                    distance: '', // Set this as needed
                    duration: '', // Set this as needed
                    details: JSON.parse(dbTrip.details)
                });
            } catch (error) {
                console.error('Failed to load trip details:', error);
            }
        };

        if (!trip.details) {
            loadTripDetails();
        } else {
            setTripDetails(trip);
        }
    }, [trip, setRouteDetails]);

    if (!tripDetails) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const tripDate = Date(tripDetails.date);
    console.log(tripDate);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.otherHeader}>{tripDetails.name}</Text>
            {/* <TripDetails tripInfo={{
                tripName: tripDetails.name,
                tripDate: tripDate.toLocaleDateString(),
                tripTime: tripDate.toLocaleTimeString(),
            }} /> */}
            {tripDetails.details ? <TransitDetails details={JSON.parse(tripDetails.details)} /> : <Text>No transit details available.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f8f8f8',
    },
    otherHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default TripView;
