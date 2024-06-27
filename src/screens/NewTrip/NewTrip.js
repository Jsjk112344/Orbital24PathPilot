import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransitDetails from '../../components/TransitDetails';
import TripDetails from "../../components/TripDetails/TripDetails";
import { RouteContext } from '../../context/RouteContext';
import { saveTripDetails } from '../../utils/SQLite/SQLite';

const NewTrip = ({ route }) => {
  const { routeDetails, saveTrip, tripInfo, userId } = useContext(RouteContext);
  const navigation = useNavigation();

  const { onSave } = route.params;

  const handleSaveTrip = async () => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }
    try {
      const tripName = tripInfo.tripName;
      const tripDate = `${tripInfo.tripDate.toISOString()}`;
      const tripTime = `${tripInfo.tripTime.toISOString()}`;
      const tripDetails = JSON.stringify(routeDetails.details);
     
      await saveTripDetails(userId, tripName, `${tripDate} ${tripTime}`, tripDetails);

      saveTrip({
        user_id: userId,
        name: tripInfo.tripName,
        date: tripDate,
        time: tripTime,
        details: routeDetails.details,
      });

      alert('Trip saved successfully!');
      
      if (onSave) {
        onSave();
      }

      navigation.goBack();
      navigation.goBack();
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
