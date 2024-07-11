import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const HelpScreen = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleEmergencyPress = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                {
                    title: 'Call Permission',
                    message: 'This app needs access to your phone to make calls.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission Denied', 'Call permission is required to make phone calls.');
                return;
            }
        }

        Alert.alert(
            'Emergency Call',
            'Are you sure you want to call emergency services?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => callEmergencyServices() }
            ]
        );
    };

    const callEmergencyServices = () => {
        const emergencyNumber = '98958350';
        const url = `tel:${emergencyNumber}`;
        Linking.openURL(url).catch(err => console.error('Error:', err));
    };

    const handleChatPress = () => {
        navigation.navigate("Chat")
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Help Dashboard</Text>
            <View style={styles.card}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleEmergencyPress} style={styles.button}>
                            <Icon name="phone" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Contact Emergency</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handleChatPress} style={styles.button}>
                            <Icon name="comments" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.buttonLabel}>Chat with Support</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 20,
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
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
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
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonLabel: {
        marginTop: 10,
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
});

export default HelpScreen;
