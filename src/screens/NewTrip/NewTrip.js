import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransitDetails from '../../components/TransitDetails';
import TripDetails from "../../components/TripDetails/TripDetails";
import { RouteContext } from "../../context/RouteContext";
import { saveTripDetails } from "../../utils/SQLite/SQLite";

const NewTrip = () => {
  const { routeDetails, saveTrip} = useContext(RouteContext);

  const navigation = useNavigation();

  const handleSaveTrip = async () => {

    const tripData = {
      name: tripInfo.tripName, // Ensure tripName is managed in your context
      date: tripInfo.tripDate.toLocaleDateString(), // Formatting date to a readable string
      time: tripInfo.tripTime.toLocaleTimeString(), // Formatting time to a readable string
      details: JSON.stringify(routeDetails.details) // Serializing details for storage
    };

    try {
      await saveTripDetails(tripData.name, tripData.date + ' ' + tripData.time, tripData.details);
      alert('Trip saved successfully!');
      navigation.navigate('SavedTrips'); // Navigate to where you list the saved trips
      
    } catch (error) {
      console.error('Failed to save trip:', error);
      alert('Failed to save trip details.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveTrip} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TripDetails/>
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
