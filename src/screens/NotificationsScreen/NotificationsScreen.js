import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import TransitDetails from '../../components/TransitDetails';
import { useContext } from 'react';
import { RouteContext } from "../../context/RouteContext";  // Correct the import path as necessary

export const useRouteDetails = () => useContext(RouteContext);

const NotificationsScreen = () => {
  const { routeDetails } = useRouteDetails(); // Directly using context
  const { details } = routeDetails;

  return (
    <View style={styles.container}>
        {details ? <TransitDetails details={details} /> : <Text>No transit details available.</Text>}
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
