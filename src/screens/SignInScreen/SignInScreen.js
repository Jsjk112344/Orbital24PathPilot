import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo_with_text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import OrDivider from '../../components/OrDivider';

import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    //Button functionality
    
    const onSignInPressed = () => {
        console.warn("Sign in");
        //validate user
        navigation.navigate('Home');
    }
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
                    value={username} 
                    setValue={setUsername}
                    placeholder="Username" 
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
                <Text>Sign in with</Text>
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