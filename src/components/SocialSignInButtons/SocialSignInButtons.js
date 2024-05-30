import React from "react"
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SocialSignInButtons = () => {
    const navigation = useNavigation();

    const onSignInGoogle = async () => {
        try {
            // Ensuring Google sign-out before a new sign-in attempt
            await GoogleSignin.signOut();
    
            // Now proceed with signing in
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            await auth().signInWithCredential(googleCredential);
            console.log('Signed in with Google!');
            navigation.navigate('Home');
        } catch (error) {
            if (error.code === 'CANCELED') {
                console.log('User cancelled the sign-in process');
            } else {
                console.error(error);
            }
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onSignInGoogle}>
                <Icon name="google" size={24} color="#DD4D44" style={styles.icon} />
                <Text style={styles.text}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20, // Provides space from any elements above
        alignItems: 'center', // Centers the button horizontally
    },
    button: {
        backgroundColor: '#FAE9EA',
        flexDirection: 'row', // Aligns the icon and text horizontally
        alignItems: 'center', // Centers the icon and text vertically within the button
        justifyContent: 'flex-start', // Aligns content to the left
        paddingHorizontal: 20, // Horizontal padding
        width: '100%', // Makes the button expand full-width
        height: 60,
        borderRadius: 30,
    },
    icon: {
        marginRight: 10, 
    },
    text: {
        fontSize: 18,
        color: '#DD4D44', 
        fontWeight: 'bold',
    }
});

export default SocialSignInButtons;
