import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { saveUserProfile } from '../../utils/SQLite/SQLite';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile } = route.params;
  const [biography, setBiography] = useState(profile.biography);
  const [socialWork, setSocialWork] = useState(profile.socialWork);

  const handleSaveProfile = () => {
    saveUserProfile(profile.user_id, biography, socialWork)
      .then(() => {
        Alert.alert('Profile Saved', 'Your profile has been updated successfully.');
        navigation.navigate('ProfileMain');
      })
      .catch(error => {
        console.error("Failed to save profile", error);
        Alert.alert('Save error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Biography:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tell us about yourself..."
        value={biography}
        onChangeText={setBiography}
        multiline
      />
      <Text style={styles.label}>Type of Social Work:</Text>
      <TextInput
        style={styles.input}
        placeholder="What kind of social work do you do?"
        value={socialWork}
        onChangeText={setSocialWork}
      />
      <CustomButton
        text="Save Profile"
        onPress={handleSaveProfile}
        type="PRIMARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 50,
    textAlignVertical: 'top',
  },
});

export default EditProfileScreen;
