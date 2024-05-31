import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { MapMarker, MapPolyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import polyline from '@mapbox/polyline';
import RouteForm from '../../utils/RouteForm/RouteForm';

const RouteScreen = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [route, setRoute] = useState(null);
    const [routeDetails, setRouteDetails] = useState({
      distance: null,
      duration: null,
      coordinates: null,
  });

    // Function to fetch route details from Google Maps Directions API
    const fetchRoute = async () => {
      if (!origin || !destination) {
          Alert.alert("Both origin and destination are required!");
          return;
      }
  
      const originStr = `${origin.latitude},${origin.longitude}`;
      const destinationStr = `${destination.latitude},${destination.longitude}`;
      try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=AIzaSyC5_cY4UTzj7QTkIG3PT8trIrvfvEMF1YQ`);
          if (response.data.status === 'OK' && response.data.routes.length > 0) {
              const routeResponse = response.data.routes[0];
              const leg = routeResponse.legs[0];
              const points = polyline.decode(routeResponse.overview_polyline.points);
              const coordinates = points.map(point => ({
                  latitude: point[0],
                  longitude: point[1]
              }));
              setRouteDetails({
                  distance: leg.distance.text,
                  duration: leg.duration.text,
                  coordinates,
              });
              setRoute(coordinates);
          } else {
              Alert.alert("Error", response.data.error_message || "No route found.");
          }
      } catch (error) {
          console.error(error);
          Alert.alert("Failed to fetch the route");
      }
    };
  

    return (
        <View style={styles.container}>
          {routeDetails.coordinates && (
            <MapPolyline
                coordinates={routeDetails.coordinates}
                strokeWidth={5}
                strokeColor="red"
            />
          )}
          {routeDetails.distance && (
            <View style={styles.routeInfo}>
                <Text style={styles.routeText}>Distance: {routeDetails.distance}</Text>
                <Text style={styles.routeText}>Duration: {routeDetails.duration}</Text>
            </View>
          )}
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {origin && <MapMarker coordinate={origin} title="Origin" />}
                {destination && <MapMarker coordinate={destination} title="Destination" />}
                {route && <MapPolyline coordinates={route} strokeWidth={5} strokeColor="red" />}
            </MapView>
            <View style={styles.overlay}>
              <RouteForm
                  setOrigin={setOrigin}
                  setDestination={setDestination}
                  setRegion={setRegion}
                  fetchRoute={fetchRoute}
              />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    overlay: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 15,
    },
    routeText: {
      fontSize: 16,
      fontWeight: 'bold',
    }
});

export default RouteScreen;
