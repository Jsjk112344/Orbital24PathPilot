// BeneficiaryDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LovingHeartDetails = ({ route }) => {
    const { details } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.detailsText}>{details}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    detailsText: {
        fontSize: 16,
        color: '#333',
    },
});

export default LovingHeartDetails;
