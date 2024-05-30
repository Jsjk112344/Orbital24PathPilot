import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    //Button functionality

    const onConfirmPressed = async () => {
        try {
            // Assuming the user is already signed in and you are verifying their email
            const currentUser = auth().currentUser;
            if (currentUser) {
                await currentUser.confirmEmailVerification(code);
                alert("Email verified!");
                navigation.navigate('Home');  // Adjust as needed
            } else {
                console.warn("No user signed in to verify.");
            }
        } catch (error) {
            console.error("Failed to verify email:", error);
            alert("Failed to verify email. Please check the code and try again.");
        }
    };
       
    const onResendPressed = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                await currentUser.sendEmailVerification();
                alert("Verification email sent!");
            } else {
                console.warn("No user signed in to send verification to.");
            }
        } catch (error) {
            console.error("Failed to send verification email:", error);
            alert("Failed to resend verification email.");
        }
    };
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your Email</Text>
                <Text style={styles.text}>
                    A verification link has been sent to your email address. 
                    Please click on the link to verify your account. 
                    After verification, you can use your credentials to sign in.
                </Text>
                <CustomButton 
                    onPress={onResendPressed}
                    text="Resend code"
                    type="SECONDARY"
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

export default ConfirmEmailScreen