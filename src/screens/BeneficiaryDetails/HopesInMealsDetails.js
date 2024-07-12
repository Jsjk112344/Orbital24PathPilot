// AscendDetails.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Logo from '../../../assets/beneficiarylogos/HopesInMeals_logo.jpeg';

const HaoRenHaoShiDetails = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.name}>Hopes In Meals</Text>
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoRow} onPress={() => Linking.openURL('https://www.giving.sg/organisation/profile/ceda4487-ebe1-42de-b93e-d8598763f581')}>
                    <Icon name="link" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>Website</Text>
                </TouchableOpacity>
                <View style={styles.infoRow}>
                    <Icon name="email" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>hopesinmeals@gmail.com</Text>
                </View>

                <View style={styles.infoRow}>
                    <Icon name="map-marker" type="material-community" size={24} color="#517fa4" />                    
                    <Text style={styles.infoText}>Central</Text>
                </View>
                <Text style={styles.description}>
                We aim to deliver food and companionship to those who need it most, such as the vulnerable, low income, elderly and children. We believe in spreading hope and helping others get back up after they have fallen.</Text>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="restaurant" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Dietary Preferences</Text>
                    </View>
                    <Text style={styles.sectionContent}>Halal, Non-Halal</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="local-shipping" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Delivery Information</Text>
                    </View>
                    <Text style={styles.sectionContent}>Doorstep Delivery</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="schedule" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Food Support Frequency</Text>
                    </View>
                    <Text style={styles.sectionContent}>Cooked Meals - Daily</Text>
                    <Text style={styles.sectionContent}>Food Rations - Weekly</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="group" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Aid Recipients</Text>
                    </View>
                    <Text style={styles.sectionContent}>Low-income Families</Text>
                    <Text style={styles.sectionContent}>Frail and/or homebound seniors</Text>
                    <Text style={styles.sectionContent}>Persons with Disabilities</Text>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    backButton: {
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
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 10,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    infoContainer: {
        marginTop: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'justify',
    },
    section: {
        marginBottom: 20,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: '#555',
    },
});

export default HaoRenHaoShiDetails;
