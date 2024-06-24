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
    const createPolyline = (responses) => {
        let coordinates = []; // This will hold all your polyline coordinates
    
        responses.forEach(response => {
            if (response.data.status === 'OK' && response.data.routes.length > 0) {
                const routeResponse = response.data.routes[0];
                const decodedPolyline = polyline.decode(routeResponse.overview_polyline.points);
                const polylineCoordinates = decodedPolyline.map(point => ({
                    latitude: point[0],
                    longitude: point[1]
                }));
                coordinates.push(...polylineCoordinates); // Add these coordinates to the main array
            }
        });
    
        return coordinates;
    };
    
    const fetchRoute = async () => {
        if (stops.length < 2) {
            Alert.alert("Error", "At least two locations are required to calculate a route!");
            return;
        }
    
        const sortedStops = await sortStops(stops);
        const requests = [];
    
        for (let i = 0; i < sortedStops.length - 1; i++) {
            const origin = sortedStops[i];
            const destination = sortedStops[i + 1];
            const originStr = `${origin.latitude},${origin.longitude}`;
            const destinationStr = `${destination.latitude},${destination.longitude}`;
            const mode = 'transit';
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&mode=${mode}&key=AIzaSyDDiOFzvaeBEkHd8BQFIG29jNXDI-GAx_0`;
            requests.push(axios.get(url));
        }
    
        Promise.all(requests)
            .then(responses => {
                const allTransitDetails = responses.map((response, index) => {
                    if (response.data.status === 'OK' && response.data.routes.length > 0) {
                        const routeResponse = response.data.routes[0];
                        return routeResponse.legs.map(leg => ({
                            distance: leg.distance.text,
                            duration: leg.duration.text,
                            steps: leg.steps.map(step => ({
                                travel_mode: step.travel_mode,
                                instructions: step.html_instructions,
                                transit_details: step.transit_details ? {
                                    departure_stop: step.transit_details.departure_stop.name,
                                    arrival_stop: step.transit_details.arrival_stop.name,
                                    line: step.transit_details.line.short_name,
                                    vehicle: step.transit_details.line.vehicle.type
                                } : null
                            }))
                        }));
                    }
                    return [];
                }).flat();
                const polylineCoordinates = createPolyline(responses);
                setRouteDetails(prevState => ({
                    ...prevState,
                    details: allTransitDetails,
                    distance: allTransitDetails.reduce((total, detail) => total + parseFloat(detail.distance.replace(' km', '')), 0) + ' km',
                    duration: allTransitDetails.reduce((total, detail) => total + parseFloat(detail.duration.replace(' mins', '')), 0) + ' mins',
                    coordinates: polylineCoordinates,
                }));
            })
            .catch(error => {
                console.error("Fetch Route Error:", error);
                Alert.alert("Network error", "Failed to fetch the route. Check your network connection.");
            });
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