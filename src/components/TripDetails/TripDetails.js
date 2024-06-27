import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TripDetails = ({ tripInfo }) => {

    const tripDate = new Date(tripInfo.tripDate).toLocaleDateString();
    const tripTime = new Date(tripInfo.tripDate).toLocaleTimeString();
    console.log(tripInfo.tripDate)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Trip Details</Text>
            <View style={styles.detailBox}>
                <Text style={styles.label}>Trip Name:</Text>
                <Text style={styles.value}>{tripInfo.tripName}</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.label}>Trip Date:</Text>
                <Text style={styles.value}>{tripDate}</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.label}>Trip Time:</Text>
                <Text style={styles.value}>{tripTime}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    detailBox: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
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
        color: '#666',
    },
    value: {
        fontSize: 16,
        color: '#444',
    }
});

export default TripDetails;
