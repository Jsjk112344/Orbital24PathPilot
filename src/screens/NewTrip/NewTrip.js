// NewTrip.js

import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransitDetails from '../../components/TransitDetails';
import TripDetails from "../../components/TripDetails/TripDetails";
import { RouteContext } from '../../context/RouteContext';
import { saveTripDetails } from '../../utils/SQLite/SQLite';

const NewTrip = ({ route }) => {
  const { routeDetails, saveTrip, tripInfo } = useContext(RouteContext);
  const navigation = useNavigation();

  const { onSave } = route.params;

  const handleSaveTrip = async () => {
    try {
      const tripName = tripInfo.tripName;
      const tripDate = tripInfo.tripDate.toISOString();
      const tripDetails = JSON.stringify(routeDetails.details);

      // Save to SQLite and context
      await saveTripDetails(tripName, tripDate, tripDetails);

      saveTrip({
        name: tripInfo.tripName,
        date: tripInfo.tripDate,
        time: tripInfo.tripTime,
        details: routeDetails.details,
      });

      alert('Trip saved successfully!');
      
      // Call the callback function to refresh the trip list
      if (onSave) {
        onSave();
      }

      navigation.navigate('Plan Route');
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
      <TripDetails tripInfo={tripInfo} />
      {routeDetails.details ? <TransitDetails details={routeDetails.details} /> : <Text>No transit details available.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default NewTrip;
