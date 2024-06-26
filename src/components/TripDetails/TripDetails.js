import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteContext } from '../../context/RouteContext';

const TripDetails = () => {
    const { tripInfo, setTripInfo } = useContext(RouteContext);

    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Trip Details</Text>
            <View style={styles.detailBox}>
                <Text style={styles.label}>Trip Name:</Text>
                <Text style={styles.value}>{tripInfo.tripName}</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.label}>Trip Date:</Text>
                <Text style={styles.value}>{tripInfo.tripDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.label}>Trip Time:</Text>
                <Text style={styles.value}>{tripInfo.tripTime.toLocaleTimeString()}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // A soft background color
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', // Dark text for the header
    },
    detailBox: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff', // White background for details box
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666', // Dark gray for text labels
    },
    value: {
        fontSize: 16,
        color: '#444', // Slightly lighter gray for values
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007BFF', // A vibrant button color
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // White text on button
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default TripDetails;
