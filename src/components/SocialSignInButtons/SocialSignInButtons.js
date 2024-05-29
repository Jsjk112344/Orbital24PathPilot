import React from "react"
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import CustomButton from "../CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn("facebook")
    }
    const onSignInGoogle = () => {
        console.warn("google")
    }
    const onSignInApple = () => {
        console.warn("apple")
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#E7EAF4'}]} onPress={onSignInFacebook}>
                <Icon name="facebook" size={30} color="#4765A9" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#FAE9EA'}]} onPress={onSignInGoogle}>
                <Icon name="google" size={30} color="#DD4D44" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#E3E3E3'}]} onPress={onSignInApple}>
                <Icon name="apple" size={30} color="#000000" />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',       // Aligns children side by side
        justifyContent: 'center', // Distributes space evenly around elements
        padding: 10,           // Ensures the container takes full width
    },
    button: {
        width: 60,  
        height: 60, 
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,  
    }
});

export default SocialSignInButtons
