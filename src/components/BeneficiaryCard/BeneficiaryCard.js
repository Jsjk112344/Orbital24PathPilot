// BeneficiaryCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomButton from '../CustomButton';

const BeneficiaryCard = ({ logo, name, halalStatus, deliveryType, distributionPeriods, serviceRegion, onViewDetails }) => {
    return (
        <View style={styles.card}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.infoRow}>
                    <Icon name="restaurant" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>{halalStatus}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="local-shipping" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>{deliveryType}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="schedule" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>{distributionPeriods}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="map-marker" type="material-community" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>{serviceRegion}</Text>
                </View>
                <CustomButton style={styles.button} onPress={onViewDetails} text="View Details" type="SECONDARY" />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,  // Adds shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 20,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'gray'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#3B71F3',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

export default BeneficiaryCard;
