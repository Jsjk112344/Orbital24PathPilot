import React, { useEffect, useState } from 'react';
import { fetchTrips } from '../../utils/SQLite/SQLite';
import { View, StyleSheet, Text } from 'react-native';
import { useContext } from 'react';
import { RouteContext } from "../../context/RouteContext";  // Correct the import path as necessary

export const useRouteDetails = () => useContext(RouteContext);

const NotificationsScreen = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips().then((data) => {
      setTrips(data);
    }).catch((error) => {
      console.log('Failed to fetch trips:', error);
    });
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {trips.map((trip, index) => (
        <View key={index} style={{ padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0' }}>
          <Text>{trip.name} - {trip.date}</Text>
          <Text>{trip.details}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
  },
});

export default NotificationsScreen;
