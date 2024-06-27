import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { RouteContext } from '../../context/RouteContext';
import { useRouteContext } from '../../context/RouteContext'; 

const MapScreen = () => {
    const { sortedStops } = useRouteContext();
    const { routeDetails, setCurrentLocation } = useContext(RouteContext);
    const [currentRegion, setCurrentRegion] = useState({
        latitude: 1.3521,  // Center on Singapore
        longitude: 103.8198,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [userLocation, setUserLocation] = useState(null);
    const [region, setRegion] = useState(currentRegion);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Access Permission",
                        message: "This app needs access to your location for navigation purposes",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    console.log("Location permission denied");
                }
            } else {
                getCurrentLocation(); 
            }
        };

        const getCurrentLocation = async () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({
                        latitude,
                        longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                    setCurrentLocation({
                        latitude,
                        longitude,
                        label: "Current Location"
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        requestLocationPermission();
    }, [setCurrentLocation]); 

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={userLocation || region}
                onRegionChangeComplete={setRegion} // This updates the region as the user interacts with the map
            >
                {routeDetails.coordinates.length > 0 && (
                    <Polyline
                        coordinates={routeDetails.coordinates}
                        strokeWidth={5}
                        strokeColor="red"
                    />
                )}
                {sortedStops.map((stop, index) => (
                    <Marker
                        key = {index}
                        coordinate={{latitude: stop.latitude, longitude: stop.longitude}}
                        title={`Stop ${index + 1}`}
                    />
                ))}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="You are here"
                    />
                )}
            </MapView>
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
});

export default MapScreen;
