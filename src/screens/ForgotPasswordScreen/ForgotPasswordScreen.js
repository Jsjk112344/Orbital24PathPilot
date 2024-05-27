import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    //Button functionality
    const onSendPressed = () => {
        navigation.navigate('ResetPassword')
    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
   
    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your Password</Text>
                <CustomInput 
                    value={username} 
                    setValue={setUsername}
                    placeholder="Username" 
                    secureTextEntry={false}
                />
                <CustomButton 
                    onPress={onSendPressed}
                    text="Send Code"
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