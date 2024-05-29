import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import OrDivider from '../../components/OrDivider';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    
    const navigation = useNavigation();
    //Button functionality
    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail');
    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }
    const onTermsOfUsePressed = () => {
        console.warn("termsofuse")
    }
    const onPrivacyPolicyPressed = () => {
        console.warn("privacypolicypressed")
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Create An Account </Text>
                <CustomInput 
                    value={username} 
                    setValue={setUsername}
                    placeholder="Username" 
                    secureTextEntry={false}

                />
                <CustomInput 
                    value={email} 
                    setValue={setEmail}
                    placeholder="Email" 
                    secureTextEntry={false}

                />
                <CustomInput 
                    value={password} 
                    setValue={setPassword} 
                    placeholder="Password" 
                    secureTextEntry={true}
                />
                <CustomInput 
                    value={passwordRepeat} 
                    setValue={setPasswordRepeat} 
                    placeholder="Repeat Password" 
                    secureTextEntry={true}
                />
                <CustomButton 
                    onPress={onRegisterPressed}
                    text="Register"
                />
                <Text style={styles.text}>
                    By registering, you confirm that you accept our
                    <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use</Text> and 
                    <Text style={styles.link} onPress={onPrivacyPolicyPressed}> Privacy Policy</Text>
                </Text>
                <CustomButton 
                    onPress={onSignInPressed}
                    text="Have an account? Sign in"
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

export default SignUpScreen