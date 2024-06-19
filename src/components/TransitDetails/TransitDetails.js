import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TransitDetails = ({ details }) => {
    if (!details || !details.length) {
        return <View><Text>No transit details available.</Text></View>;
    }

    return (
        <ScrollView style={styles.container}>
            {details.map((leg, index) => (
                // Assuming each 'leg' here is correct and contains a 'steps' array
                <View key={index} style={styles.legContainer}>
                    <Text style={styles.legTitle}>Leg {index + 1}</Text>
                    {leg.steps.map((step, stepIndex) => (
                        <View key={stepIndex} style={styles.stepContainer}>
                            <Text style={styles.instructions}>{step.instructions}</Text>
                            {step.transit_details && (
                                <View style={styles.transitDetailsContainer}>
                                    <Text style={styles.transitText}>Depart from: {step.transit_details.departure_stop}</Text>
                                    <Text style={styles.transitText}>Arrive at: {step.transit_details.arrival_stop}</Text>
                                    <Text style={styles.transitText}>Line: {step.transit_details.line}</Text>
                                    <Text style={styles.transitText}>Vehicle: {step.transit_details.vehicle}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    legContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    legTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stepContainer: {
        marginBottom: 5,
    },
    instructions: {
        fontSize: 16,
        color: '#333',
    },
    transitDetailsContainer: {
        marginTop: 5,
        paddingLeft: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#DD4D44',
    },
    transitText: {
        fontSize: 14,
        color: '#555',
    }
});

export default TransitDetails;
