import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getAuth, getUserByEmail, sendPasswordResetEmail } from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    //Button functionality
    const onSendPressed = () => {
        if (email.trim() === '') {
            alert("Please enter your email.");
            return;
        }

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset link has been sent to your email");
            console.log("Password reset link sent");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error:', error);
            alert(error.message);
        });
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
   
    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your Password</Text>
                <CustomInput 
                    value={email} 
                    setValue={setEmail}
                    placeholder="Email Address" 
                    secureTextEntry={false}
                />
                <CustomButton 
                    onPress={onSendPressed}
                    text="Reset Password"
                />
                <CustomButton 
                    onPress={onSignInPressed}
                    text="Back to Sign In"
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
});

export default ForgotPasswordScreen