import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTrips, deleteTrip } from '../../utils/SQLite/SQLite';
import { RouteContext } from '../../context/RouteContext';

const MyTripsScreen = () => {
  const { userId } = useContext(RouteContext);
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (userId) {
      loadTrips();
    }
  }, [userId]);

  const loadTrips = () => {
    fetchTrips(userId).then(setTrips).catch((error) => {
      console.error('Failed to fetch trips:', error);
    });
  };

  const handleSelectTrip = (trip) => {
    navigation.navigate('TripView', { trip });
  };

  const handleDeleteTrip = (tripId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this trip?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => {
        deleteTrip(tripId).then(() => {
          Alert.alert("Success", "Trip deleted successfully!");
          loadTrips();  // Reload the trips after deletion
        }).catch((error) => {
          console.error('Failed to delete trip:', error);
          Alert.alert("Error", "Failed to delete the trip.");
        });
      }}
    ]);
  };

  const renderItem = ({ item }) => {
    const tripDate = new Date(item.date.split(' ')[0]); // Extract and parse the date part
    return (
      <View style={styles.tripItem}>
        <TouchableOpacity onPress={() => handleSelectTrip(item)} style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{tripDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTrip(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={loadTrips} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  refreshButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  refreshButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyTripsScreen;
