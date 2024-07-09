// BeneficiaryListScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import BeneficiaryCard from '../../components/BeneficiaryCard/BeneficiaryCard';


// Use require to load local images
const ApexLogo = require('../../../assets/beneficiarylogos/Apex_logo.png');
const AscendingLogo = require('../../../assets/beneficiarylogos/Ascending_Hope_logo.jpg');
const BlessedGraceLogo = require('../../../assets/beneficiarylogos/BlessedGrace_logo.jpeg')
const ClubLogo = require('../../../assets/beneficiarylogos/Club_logo.jpg');
const ChengHongLogo = require('../../../assets/beneficiarylogos/ChengHong_logo.png')
const EnLogo = require('../../../assets/beneficiarylogos/En_logo.jpeg');
const FilosLogo = require('../../../assets/beneficiarylogos/Filos_logo.png');
const FFTH = require('../../../assets/beneficiarylogos/FFTH_logo.jpg');
const FFFALogo = require('../../../assets/beneficiarylogos/FFFA_logo.png')
const HaoRenHaoShiLogo = require('../../../assets/beneficiarylogos/HaoRenHaoShi_logo.png')
const HopesInMealsLogo = require('../../../assets/beneficiarylogos/HopesInMeals_logo.jpeg')
const KrsnaLogo = require('../../../assets/beneficiarylogos/krsna_logo.png');
const LovingHeartLogo = require('../../../assets/beneficiarylogos/LovingHeart_logo.png');
const MummyLogo = require('../../../assets/beneficiarylogos/mummy_logo.jpeg');
const RealmLogo = require('../../../assets/beneficiarylogos/realm_logo.jpg');

const beneficiaries = [
    {
        logo: ApexLogo,
        name: 'Apex Club of Bukit Timah',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Weekly \nFresh Produce - Weekly',
        serviceRegion: 'Central'
    },
    {
        logo: AscendingLogo,
        name: 'Ascending Hope Community Services',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point \nDoorstep Delivery',
        distributionPeriods: 'Cooked Meals - Weekly(1-3 times a week) \nFresh Produce - Monthly',
        serviceRegion: 'Central'
    },
    {
        logo: BlessedGraceLogo,
        name: 'Blessed Grace Social Services Limited',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point \nDoorstep Delivery',
        distributionPeriods: 'Cooked Meals - Daily\nFood Rations - Monthly\nFood Vouchers - Yearly',
        serviceRegion: 'East'
    },
    {
        logo: ChengHongLogo,
        name: 'Cheng Hong Welfare Service Society',
        halalStatus: 'Halal',
        deliveryType: 'Collect from Distribution Point \nDoorstep Delivery',
        distributionPeriods: 'Cooked Meals - Daily\nFood Rations - Bi-monthly',
        serviceRegion: 'East'
    },
    {
        logo: ClubLogo,
        name: 'Club Rainbow (Singapore)',
        halalStatus: 'Halal',
        deliveryType: 'Door Step Delivery, Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Monthly \nFresh Produce - Weekly',
        serviceRegion: 'Island-wide'
    },
    {
        logo: EnLogo,
        name: 'En Community Services Society',
        halalStatus: 'Halal',
        deliveryType: 'Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Monthly \nFood Vouchers - Yearly / Ad-hoc',
        serviceRegion: 'Central'
    },
    {
        logo: FFTH,
        name: 'Food From The Heart Singapore',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Collect from Distribution Point',
        distributionPeriods: 'Food Rations - Monthly \nFresh Produce - Monthly',
        serviceRegion: 'Island-wide'
    },
    {
        logo: FFFALogo,
        name: 'Free Food For All',
        halalStatus: 'Halal',
        deliveryType: 'Door-step Delivery',
        distributionPeriods: 'Food Rations - Monthly',
        serviceRegion: 'Island-wide'
    },
    {
        logo: FilosLogo,
        name: 'Filos Community Services',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Door Step Delivery',
        distributionPeriods: 'Food Rations - Bi-weekly \nFresh Produce - Monthly',
        serviceRegion: 'East'
    },
    {
        logo: LovingHeartLogo,
        name: 'Loving Heart Multi-Service Centre',
        halalStatus: 'Halal, Non-Halal',
        deliveryType: 'Door Step Delivery',
        distributionPeriods: 'Food Rations - Monthly \nFresh Produce - Monthly',
        serviceRegion: 'West'
    },
];

// Mapping between beneficiary names and their corresponding detail screens
const detailScreens = {
    'Apex Club of Bukit Timah': 'ApexDetails',
    'Ascending Hope Community Services': 'AscendDetails',
    'Blessed Grace Social Services Limited': 'BlessedGraceDetails',
    'Cheng Hong Welfare Service Society': "ChengHongDetails",
    'Club Rainbow (Singapore)': 'ClubRainbowDetails',
    'Food From The Heart Singapore': 'FFTHDetails',
    'Free Food For All': 'FFFADetails',
    'En Community Services Society': 'EnDetails',
    'Filos Community Services': 'FilosDetails',
    'Loving Heart Multi-Service Centre': 'LovingHeartDetails',

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
                    serviceRegion={beneficiary.serviceRegion}
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
