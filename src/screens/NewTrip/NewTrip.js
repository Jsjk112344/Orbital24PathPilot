import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransitDetails from '../../components/TransitDetails';
import { RouteContext } from "../../context/RouteContext";

const NewTrip = () => {
  const { routeDetails } = useContext(RouteContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Implement save functionality here */}} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {routeDetails.details ? <TransitDetails details={routeDetails.details} /> : <Text>No transit details available.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space the buttons evenly
    paddingHorizontal: 10, // Padding on the sides
    paddingTop: 10, // Padding on top for safe area spacing
    paddingBottom: 10, // Padding below the header
    backgroundColor: '#f8f8f8', // Background color of the header
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  }
});

export default NewTrip;
