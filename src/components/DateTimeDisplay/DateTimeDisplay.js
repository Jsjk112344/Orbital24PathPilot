import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateTimeDisplay = ({ date }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Date of Trip:</Text>
            <Text style={styles.value}>{date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            <Text style={styles.label}>Start Time:</Text>
            <Text style={styles.value}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    }
});

export default DateTimeDisplay;
