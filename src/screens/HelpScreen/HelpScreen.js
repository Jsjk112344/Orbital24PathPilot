import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform, PermissionsAndroid, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const FAQs = [
    { question: 'What should I do if no one is home to receive the food?', answer: 'Leave the food at the door and notify the recipient via phone or the app.' },
    { question: 'How do I handle special dietary requests?', answer: 'Check the delivery details for any special instructions and ensure you follow them.' },
    { question: 'What should I do if the recipient is unwell?', answer: 'Report the situation to the emergency contact provided and wait for further instructions.' },
    { question: 'How can I ensure the food stays fresh?', answer: 'Use insulated bags and follow the delivery instructions to minimize the time food is out of storage.' },
    { question: 'What if I feel unsafe during delivery?', answer: 'Call emergency services immediately and notify your coordinator.' },
];

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
        navigation.navigate("Chat");
    };

    const handleFAQPress = (faq) => {
        navigation.navigate("FAQDetail", { faq });
    };

    const renderFAQItem = ({ item }) => (
        <TouchableOpacity style={styles.faqCard} onPress={() => handleFAQPress(item)}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
        </TouchableOpacity>
    );

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
            <Text style={styles.faqTitle}>Frequently Asked Questions:</Text>
            <FlatList
                data={FAQs}
                renderItem={renderFAQItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.faqList}
            />
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
        marginBottom: 20,
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
    faqTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    faqList: {
        paddingBottom: 20,
    },
    faqCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    faqQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default HelpScreen;
