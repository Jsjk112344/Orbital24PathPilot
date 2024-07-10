import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RouteContext } from '../../context/RouteContext';
import { fetchUserProfile } from '../../utils/SQLite/SQLite';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton';

const ProfileScreen = () => {
  const { userId } = useContext(RouteContext); 
  const [profile, setProfile] = useState({ biography: '', socialWork: '' });
  const navigation = useNavigation();

  const loadProfile = () => {
    fetchUserProfile(userId)
      .then(profile => {
        setProfile(profile);
      })
      .catch(error => {
        console.error("Failed to fetch profile", error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      loadProfile();
    }, [userId])
  );

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('Signed Out', 'You have been signed out successfully.');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        Alert.alert('Sign out error', error.message);
      });
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { profile });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://your-image-url.com' }} style={styles.avatar} />
        <Text style={styles.username}>My Profile</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Biography:</Text>
        <Text style={styles.value}>{profile.biography}</Text>
        <Text style={styles.label}>Type of Social Work:</Text>
        <Text style={styles.value}>{profile.socialWork}</Text>
      </View>
      <CustomButton onPress={handleChangePassword} type="SECONDARY" text={"Change Password"} />
      <CustomButton onPress={handleSignOut} type="TERTIARY" text={"Sign Out"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8', // Set a background color for better contrast
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Explicitly setting the text color
  },
  editButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#000', // Explicitly setting the text color
  },
  info: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Explicitly setting the text color
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666', // Explicitly setting the text color
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Explicitly setting the text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
