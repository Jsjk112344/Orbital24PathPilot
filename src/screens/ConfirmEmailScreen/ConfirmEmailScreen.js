import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    //Button functionality

    const onConfirmPressed = () => {
        console.warn("confirm pressed")
    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
    const onResendPressed = () => {
        console.warn("resend pressed");
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your Email</Text>
                <CustomInput 
                    value={code} 
                    setValue={setCode}
                    placeholder="Enter your Confirmation Code" 
                    secureTextEntry={false}
                />
                <CustomButton 
                    onPress={onConfirmPressed}
                    text="Confirm"
                />
                
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