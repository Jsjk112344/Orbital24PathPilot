// RouteScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RouteScreen = () => {
    const navigation = useNavigation();
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateGreeting = () => {
            const hour = currentTime.getHours();
            if (hour < 12) {
                setGreeting('Good Morning');
            } else if (hour < 18) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
        };

        const updateTime = () => {
            setCurrentTime(new Date());
        };

        updateGreeting();
        const intervalId = setInterval(updateTime, 60000); // Update time every minute

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [currentTime]);

    const handleAddTripPress = () => {
        navigation.navigate('InputStops');
    };

    const handleViewBeneficiariesPress = () => {
        navigation.navigate('BeneficiaryList');
    };

    const handleSOSPress = () => {
        // Placeholder for SOS functionality
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.date}>{currentTime.toLocaleDateString()}</Text>
                <Text style={styles.time}>{currentTime.toLocaleTimeString()}</Text>
                <Text style={styles.question}>What would you like to do?</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleAddTripPress} style={styles.button}>
                            <Icon name="plus" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Add Trip</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleViewBeneficiariesPress} style={styles.button}>
                            <Icon name="users" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Beneficiaries</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleSOSPress} style={styles.button}>
                            <Icon name="exclamation-triangle" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>SOS</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', // Background color for the screen
        padding: 20,
    },
    header: {
        alignSelf: 'flex-start',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#666666', // Explicitly stating the color
    },
    date: {
        fontSize: 18,
        color: '#666666', // Explicitly stating the color
    },
    time: {
        fontSize: 18,
        color: '#666666', // Explicitly stating the color
        marginBottom: 30,
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#888888', // Explicitly stating the color
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    buttonWrapper: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3B71F3',
        padding: 20,
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonLabel: {
        marginTop: 10,
        fontSize: 16,
        color: '#666666', // Explicitly stating the color
    },
});

export default RouteScreen;
