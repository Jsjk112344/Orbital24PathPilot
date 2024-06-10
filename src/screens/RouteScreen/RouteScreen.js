import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import RouteForm from '../../utils/RouteForm/RouteForm';
import { RouteContext } from '../../context/RouteContext';  // Ensure this is imported
import axios from 'axios';
import polyline from '@mapbox/polyline';

const RouteScreen = () => {
    const { setRouteDetails } = useContext(RouteContext);
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const fetchRoute = async (stops) => {
      if (stops.length < 2) {
          Alert.alert("Error", "At least two locations are required to calculate a route!");
          return;
      }
  
      const waypoints = stops.slice(1, -1).map(stop => `${stop.latitude},${stop.longitude}`).join('|');
      const origin = stops[0];
      const destination = stops[stops.length - 1];
      const originStr = `${origin.latitude},${origin.longitude}`;
      const destinationStr = `${destination.latitude},${destination.longitude}`;
  
      try {
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=AIzaSyDDiOFzvaeBEkHd8BQFIG29jNXDI-GAx_0` + (waypoints ? `&waypoints=optimize:true|${waypoints}` : '');
          console.log("URL:", url); // Log the URL for the request
          const response = await axios.get(url);
          console.log("API Response:", response.data); // Log the API response
  
          if (response.data.status === 'OK' && response.data.routes.length > 0) {
              const routeResponse = response.data.routes[0];
              const points = polyline.decode(routeResponse.overview_polyline.points);
              const coordinates = points.map(point => ({
                  latitude: point[0],
                  longitude: point[1]
              }));
  
              setRouteDetails({
                  coordinates,
                  distance: routeResponse.legs.reduce((total, leg) => total + leg.distance.value, 0) / 1000 + ' km',
                  duration: routeResponse.legs.reduce((total, leg) => total + leg.duration.value, 0) / 60 + ' mins',
              });
          } else {
              Alert.alert("Error", response.data.error_message || "No route found.");
          }
      } catch (error) {
          console.error("Fetch Route Error:", error);
          Alert.alert("Network error", "Failed to fetch the route. Check your network connection.");
      }
    };

    return (
        <View style={styles.container}>
            <RouteForm fetchRoute={fetchRoute} setRegion={setRegion} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default RouteScreen;
