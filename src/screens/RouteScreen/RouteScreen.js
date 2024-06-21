import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import RouteForm from '../../utils/RouteForm/RouteForm';
import { RouteContext } from '../../context/RouteContext'; 
import axios from 'axios';
import polyline from '@mapbox/polyline';
import TransitDetails from '../../components/TransitDetails';
import { sortStops } from '../../utils/SortStop/SortStop';
import { timeTaken } from '../../utils/SortStop/SortStop';
const RouteScreen = () => {
    const { routeDetails, setRouteDetails, currentLocation } = useContext(RouteContext);
    const [stops, setStops] = useState([]);
    const [region, setRegion] = useState({
        latitude: 1.3521,  // Default to Singapore
        longitude: 103.8198,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const fetchRoute = async () => {
        if (stops.length < 2) {
            Alert.alert("Error", "At least two locations are required to calculate a route!");
            return;
        }

        //Function to sort "stops" array
        newStops = sortStops(stops);
        
    
        // const waypoints = stops.slice(1, -1).map(stop => `${stop.latitude},${stop.longitude}`).join('|');
        // const origin = stops[0];
        // const destination = stops[stops.length - 1];
        // const originStr = `${origin.latitude},${origin.longitude}`;
        // const destinationStr = `${destination.latitude},${destination.longitude}`;
        // const mode = 'transit';  // Set the mode to transit
    
        // try {
        //     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&mode=${mode}&key=AIzaSyDDiOFzvaeBEkHd8BQFIG29jNXDI-GAx_0` + (waypoints ? `&waypoints=optimize:true|${waypoints}` : '');
        //     const response = await axios.get(url);
    
        //     if (response.data.status === 'OK' && response.data.routes.length > 0) {
        //         const routeResponse = response.data.routes[0];
        //         const transitDetails = routeResponse.legs.map(leg => ({
        //             distance: leg.distance.text,
        //             duration: leg.duration.text,
        //             steps: leg.steps.map(step => {
        //                 return {
        //                     travel_mode: step.travel_mode,
        //                     instructions: step.html_instructions,
        //                     transit_details: step.transit_details ? {
        //                         departure_stop: step.transit_details.departure_stop.name,
        //                         arrival_stop: step.transit_details.arrival_stop.name,
        //                         line: step.transit_details.line.short_name,
        //                         vehicle: step.transit_details.line.vehicle.type
        //                     } : null
        //                 };
        //             })
        //         }));
    
        //         setRouteDetails(prevState => ({
        //             ...prevState,
        //             coordinates: [], // Transit routes might not use polyline
        //             details: transitDetails,
        //             distance: routeResponse.legs.reduce((total, leg) => total + leg.distance.value, 0) / 1000 + ' km',
        //             duration: routeResponse.legs.reduce((total, leg) => total + leg.duration.value, 0) / 60 + ' mins',
        //         }));
        //     } else {
        //         Alert.alert("Error", response.data.error_message || "No route found.");
        //     }
        // } catch (error) {
        //     console.error("Fetch Route Error:", error);
        //     Alert.alert("Network error", "Failed to fetch the route. Check your network connection.");
        // }
    };
    
    return (
        <View style={styles.container}>
            <RouteForm
                fetchRoute={fetchRoute}
                setRegion={setRegion}
                stops={stops}
                setStops={setStops}
                onUseMyLocation={() => {
                    if (currentLocation && !stops.some(stop => stop.latitude === currentLocation.latitude && stop.longitude === currentLocation.longitude)) {
                        setStops([currentLocation, ...stops]);
                        setRegion({
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        });
                    }
                }}
            />
        </View>
    );
    
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default RouteScreen;
