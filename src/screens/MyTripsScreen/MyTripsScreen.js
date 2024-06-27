import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { fetchTrips, deleteTrip } from '../../utils/SQLite/SQLite';
import { useNavigation } from '@react-navigation/native';

const MyTripsScreen = () => {
  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadTrips();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const loadTrips = () => {
    fetchTrips().then((data) => {
      setTrips(data);
    }).catch((error) => {
      console.error('Failed to fetch trips:', error);
    });
  };

  const handleRefresh = () => {
    loadTrips();
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRefresh} style={styles.button}>
                    <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          
          <View style={styles.tripItem}>
            
            <TouchableOpacity onPress={() => handleSelectTrip(item)} style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{new Date(item.date).toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTrip(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 10,
    marginRight: 10,
  },
  refreshButtonText: {
    color: '#007AFF',
    fontSize: 16,
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

export default MyTripsScreen;
