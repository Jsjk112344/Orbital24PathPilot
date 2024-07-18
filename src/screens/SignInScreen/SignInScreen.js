import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo_with_text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import OrDivider from '../../components/OrDivider';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    //Button functionality
    
    const onSignInPressed = async () => {
        // Check if email or password fields are empty
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter your email and password.');
            return;
        }
    
        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in:', response);
            navigation.navigate('home');
        } catch (error) {
            console.error('Failed to sign in:', error.message);
            alert('Failed to sign in, please check your credentials and try again.');
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    }
    
    const onSignUpPressed = () => {
        navigation.navigate("SignUp")
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style = {[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain" 
                /> 
                <CustomInput 
                    value={email} 
                    setValue={setEmail}
                    placeholder="Email Address" 
                    secureTextEntry={false}

                />
                <CustomInput 
                    value={password} 
                    setValue={setPassword} 
                    placeholder="Password" 
                    secureTextEntry={true}
                />
                <CustomButton 
                    onPress={onSignInPressed}
                    text="Sign in"
                />
                <CustomButton 
                    onPress={onForgotPasswordPressed}
                    text="Forgot Password?"
                    type="TERTIARY"
                />
                <CustomButton 
                    onPress={onSignUpPressed}
                    text="Don't Have an Account? Create One"
                    type="TERTIARY"
                />
                <OrDivider />
                <SocialSignInButtons />
                
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
});

export default SignInScreen