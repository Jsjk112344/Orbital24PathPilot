import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import CustomButton from '../../components/CustomButton'; // Ensure correct path to CustomButton

const ProfileScreen = () => {
    const [biography, setBiography] = useState('');
    const [socialWork, setSocialWork] = useState('');
    const navigation = useNavigation(); // Hook for navigation

    // Function to handle sign-out
    const handleSignOut = () => {
        auth()
        .signOut()
        .then(() => {
            Alert.alert('Signed Out', 'You have been signed out successfully.');
            navigation.navigate('SignIn'); // Navigate to the Sign-In screen
        })
        .catch(error => {
            Alert.alert('Sign out error', error.message);
        });
    };

    // Navigate to Change Password Screen
    const handleChangePassword = () => {
        navigation.navigate('ChangePassword'); // Make sure you have this screen configured in your navigator
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>My Profile</Text>
            <Text style={styles.label}>Biography:</Text>
            <TextInput
                style={styles.input}
                placeholder="Tell us about yourself..."
                value={biography}
                onChangeText={setBiography}
                multiline
            />

            <Text style={styles.label}>Type of Social Work:</Text>
            <TextInput
                style={styles.input}
                placeholder="What kind of social work do you do?"
                value={socialWork}
                onChangeText={setSocialWork}
            />

            <CustomButton
                text="Change Password"
                onPress={handleChangePassword}
                type="SECONDARY"
            />
            <CustomButton
                text="Sign Out"
                onPress={handleSignOut}
                type="TERTIARY"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        minHeight: 50,
        textAlignVertical: 'top',
    }
});

export default ProfileScreen;
