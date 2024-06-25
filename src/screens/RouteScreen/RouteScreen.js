import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const RouteScreen = () => {
    const navigation = useNavigation();

    const handleAddTripPress = () => {
        navigation.navigate('InputStops');  // Navigate to InputStops Screen
    };

    return (
        <View style={styles.container}>
            <CustomButton onPress={handleAddTripPress} style={styles.button} text="+ Add Trip"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

        alignItems: 'center',      // Center the button horizontally
        padding: 20,               // Add some padding around the container
    },
    button: {
        backgroundColor: '#007bff',  // A blue color for the button
        padding: 20,
        borderRadius: 10,
        width: '80%',               // Button takes 80% of container width
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default RouteScreen;
