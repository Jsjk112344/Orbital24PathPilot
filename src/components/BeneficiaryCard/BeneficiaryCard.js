// BeneficiaryCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomButton from '../CustomButton';

const BeneficiaryCard = ({ logo, name, halalStatus, deliveryType, distributionPeriods, onViewDetails }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.infoContainer}>
                <Icon name="restaurant" type="material" color="#517fa4" />
                <Text style={styles.infoText}>{halalStatus}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="local-shipping" type="material" color="#517fa4" />
                <Text style={styles.infoText}>{deliveryType}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="schedule" type="material" color="#517fa4" />
                <Text style={styles.infoText}>{distributionPeriods}</Text>
            </View>
            <CustomButton onPress={onViewDetails} type="SECONDARY" text={"View Details"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        marginLeft: 10,
    },
    detailsButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    detailsButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default BeneficiaryCard;
