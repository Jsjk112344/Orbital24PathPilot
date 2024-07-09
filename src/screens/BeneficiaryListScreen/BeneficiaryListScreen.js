// BeneficiaryListScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import BeneficiaryCard from '../../components/BeneficiaryCard/BeneficiaryCard';

// Use require to load local images
const ApexLogo = require('../../../assets/beneficiarylogos/Apex_logo.png');
const AscendingLogo = require('../../../assets/beneficiarylogos/Ascending_Hope_logo.jpg');
const FFTH = require('../../../assets/beneficiarylogos/FFTH_logo.jpg');
const ClubLogo = require('../../../assets/beneficiarylogos/Club_logo.jpg');

const beneficiaries = [
    {
        logo: ApexLogo,
        name: 'Apex Club of Bukit Timah',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Weekly \nFresh Produce - Weekly',
    },
    {
        logo: AscendingLogo,
        name: 'Ascending Hope Community Services',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point \nDoorstep Delivery',
        distributionPeriods: 'Cooked Meals - Weekly(1-3 times a week) \nFresh Produce - Monthly',
    },
    {
        logo: ClubLogo,
        name: 'Club Rainbow (Singapore)',
        halalStatus: 'Halal',
        deliveryType: 'Door Step Delivery, Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Monthly \nFresh Produce - Weekly',
    },
    {
        logo: FFTH,
        name: 'Food From The Heart Singapore',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Monthly \nFresh Produce - Monthly',
    },
];

// Mapping between beneficiary names and their corresponding detail screens
const detailScreens = {
    'Apex Club of Bukit Timah': 'ApexDetails',
    'Ascending Hope Community Services': 'AscendDetails',
    'Club Rainbow (Singapore)': 'ClubRainbowDetails',
    'Food From The Heart Singapore': 'FFTHDetails',
};

const BeneficiaryListScreen = ({ navigation }) => {
    const handleViewDetails = (beneficiaryName) => {
        const screenName = detailScreens[beneficiaryName];
        if (screenName) {
            navigation.navigate(screenName);
        } else {
            console.error(`No detail screen found for beneficiary: ${beneficiaryName}`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            {beneficiaries.map((beneficiary, index) => (
                <BeneficiaryCard
                    key={index}
                    logo={beneficiary.logo}
                    name={beneficiary.name}
                    halalStatus={beneficiary.halalStatus}
                    deliveryType={beneficiary.deliveryType}
                    distributionPeriods={beneficiary.distributionPeriods}
                    onViewDetails={() => handleViewDetails(beneficiary.name)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
});

export default BeneficiaryListScreen;
