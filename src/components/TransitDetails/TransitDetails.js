import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const TransitDetails = ({ details }) => {
    if (!details || details.length === 0) {
        return <View><Text>No transit details available.</Text></View>;
    }
    return (
        <ScrollView style={styles.container}>
            {details.map((leg, index) => (
                <Card key={index} containerStyle={styles.legContainer}>
                    <Card.Title style={styles.legTitle}>Leg {index + 1}</Card.Title>
                    <Card.Divider/>
                    <Text style={styles.distance}>
                        <Icon name="map-marker-distance" type="material-community" color="#517fa4" /> Distance: {leg.distance || 'Not available'}
                    </Text>
                    {leg.steps.map((step, stepIndex) => {
                        const modifiedInstructions = step.instructions.replace('Subway', 'MRT');
                        
                      
                        const vehicle = step.transit_details?.vehicle?.type;
                        let detailedInstructions = modifiedInstructions;

                        if (vehicle === 'BUS' && step.transit_details?.line?.short_name) {
                            detailedInstructions += ` (Bus numbers: ${step.transit_details.line.short_name})`;
                        }

                        return (
                            <View key={stepIndex} style={styles.stepContainer}>
                                <Text style={styles.instructions}>
                                    <Icon name="walk" type="material-community" color="#517fa4" /> {detailedInstructions}
                                </Text>
                                {step.transit_details && (
                                    <View style={styles.transitDetailsContainer}>
                                        {step.transit_details.departure_stop && (
                                            <Text style={styles.transitText}>
                                                <Icon name="bus-stop" type="material-community" color="#517fa4" /> Depart from: {step.transit_details.departure_stop}
                                            </Text>
                                        )}
                                        {step.transit_details.arrival_stop && (
                                            <Text style={styles.transitText}>
                                                <Icon name="flag-checkered" type="material-community" color="#517fa4" /> Arrive at: {step.transit_details.arrival_stop}
                                            </Text>
                                        )}
                                        {step.transit_details.line && step.transit_details.line.short_name && (
                                            <Text style={styles.transitText}>
                                                <Icon name="bus" type="material-community" color="#517fa4" /> Bus Number: {step.transit_details.line.short_name}
                                            </Text>
                                        )}
                                        {step.transit_details.line && step.transit_details.line.name && (
                                            <Text style={styles.transitText}>
                                                <Icon name="bus" type="material-community" color="#517fa4" /> Line: {step.transit_details.line.name}
                                            </Text>
                                        )}
                                        {step.transit_details.vehicle && (
                                            <Text style={styles.transitText}>
                                                <Icon name="train" type="material-community" color="#517fa4" /> Vehicle: {step.transit_details.vehicle}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
    },
    legContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        elevation: 3,
    },
    legTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    stepContainer: {
        marginVertical: 5,
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
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
        marginVertical: 2,
    },
    distance: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
    },
});

export default TransitDetails;
