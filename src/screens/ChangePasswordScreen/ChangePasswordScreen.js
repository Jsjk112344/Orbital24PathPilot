import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        try {
            const user = auth().currentUser;
            const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
            await user.reauthenticateWithCredential(credential);
            await user.updatePassword(newPassword);
            alert('Password changed successfully!');
            navigation.navigate('Profile'); // Navigates back to the Profile page after successful password change
        } catch (error) {
            alert("The provided credentials were either invalid, or the account was registered with a Google Account");
        }
    };

    const handleCancel = () => {
        navigation.navigate('Profile'); // Navigates back to the Profile page
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <CustomInput 
                value={currentPassword}
                setValue={setCurrentPassword}
                placeholder="Current Password"
                secureTextEntry={true}
            />
            <CustomInput 
                value={newPassword}
                setValue={setNewPassword}
                placeholder="New Password"
                secureTextEntry={true}
            />
            <CustomInput 
                value={confirmPassword}
                setValue={setConfirmPassword}
                placeholder="Confirm New Password"
                secureTextEntry={true}
            />
            <CustomButton 
                onPress={handleChangePassword}
                text="Change Password"
            />
            <CustomButton 
                onPress={handleCancel}
                text="Cancel"
                type="TERTIARY"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
});

export default ChangePasswordScreen;
