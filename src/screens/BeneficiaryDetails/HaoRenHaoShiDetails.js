// AscendDetails.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Logo from '../../../assets/beneficiarylogos/HaoRenHaoShi_logo.png';

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
            <Text style={styles.name}>Hao Ren Hao Shi Limited</Text>
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoRow} onPress={() => Linking.openURL('https://www.haorenhaoshi.org.sg/')}>
                    <Icon name="link" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>Website</Text>
                </TouchableOpacity>
                <View style={styles.infoRow}>
                    <Icon name="email" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>enquiry@hrhs.org.sg</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="phone" size={24} color="#517fa4" />
                    <Text style={styles.infoText}>9058 5898</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="map-marker" type="material-community" size={24} color="#517fa4" />                    
                    <Text style={styles.infoText}>Island-wide</Text>
                </View>
                <Text style={styles.description}>
                    Hao Ren Hao Shi is a non profit, non sectarian charity founded by Mr Anson Ng, recognised with both 2022 Singaporean of the year & 2021 Silent Hero Awards. While serving 1500 needly families monthly across Singapore, our main distribution & mobile charity initiatives also introduces volunteerism to school children, young adults & families. </Text>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="restaurant" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Dietary Preferences</Text>
                    </View>
                    <Text style={styles.sectionContent}>Halal, Non-Halal, Vegetarian</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="local-shipping" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Delivery Information</Text>
                    </View>
                    <Text style={styles.sectionContent}>Collect from Distribution Point</Text>
                    <Text style={styles.sectionContent}>Doorstep Delivery</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Icon name="schedule" size={24} color="#517fa4" />
                        <Text style={styles.sectionHeader}>Food Support Frequency</Text>
                    </View>
                    <Text style={styles.sectionContent}>Food Rations - Weekly (1-3 times a week)</Text>

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
