import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, PermissionsAndroid, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { RouteContext } from '../../context/RouteContext';
import { useRouteContext } from '../../context/RouteContext'; 
import { Image } from 'react-native-elements';
import arrow from '../../../assets/images/location_arrow.png';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';
import BottomDrawer from '../../components/BottomDrawer/BottomDrawer';
import useRouteLogic from '../../utils/useRouteLogic/useRouteLogic';
//import {getNextInstruction}

setUpdateIntervalForType(SensorTypes.magnetometer, 1000);

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
    const [heading, setHeading] = useState(0);
    //const [currentInstruction, setCurrentInstruction] = useState(' ');
    const {fetchAndSetNextStop} = useRouteLogic()

    const updateRoute = useCallback(async () => {
        if (userLocation) {
            await fetchAndSetNextStop(userLocation);
        }
    }, [userLocation, fetchAndSetNextStop]);

    useEffect(() => {
        let watchId;

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
                    watchCurrentLocation();
                } else {
                    console.log("Location permission denied");
                }
            } else {
                watchCurrentLocation(); 
            }
        };

        const watchCurrentLocation = async () => {
            watchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    };
                    setUserLocation(newLocation);
                    setCurrentLocation({
                        latitude,
                        longitude,
                        label: "Current Location"
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                },
                { enableHighAccuracy: true, distanceFilter: 10, interval: 500, fastestInterval: 500 }
            );
        };

        const watchHeading = () => {
            const subscription = magnetometer.subscribe(({ x, y, z }) => {
                let angle = 0;
                if (Math.atan2(y, x) >= 0) {
                    angle = Math.atan2(y, x) * (180 / Math.PI);
                } else {
                    angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
                }
                setHeading(angle);
            });

            return () => subscription.unsubscribe();
        };

        requestLocationPermission();
        const headingSubscription = watchHeading();

        return () => {
            if (watchId !== null) {
                Geolocation.clearWatch(watchId);
            }
            headingSubscription();
        };
    }, [setCurrentLocation]); 

    useEffect(() => {
        updateRoute();
    }, [updateRoute]);

    //include Claude suggestion for directions here

    const instructions = routeDetails.instructions || ["No instructions available"];

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={userLocation || region}
                onRegionChangeComplete={setRegion} // This updates the region as the user interacts with the map
            >
                {
                    <Polyline
                        coordinates={routeDetails.nextStopCoords}
                        strokeWidth={5}
                        strokeColor='red'
                    />
                }
                {routeDetails.coordinates.length > 0 && (
                    <Polyline
                        coordinates={routeDetails.coordinates}
                        strokeWidth={5}
                        strokeColor="red"
                        lineDashPattern={[20,20]}
                        
                    />
                )}
                {sortedStops.map((stop, index) => (
                    <Marker
                        key={index}
                        coordinate={{latitude: stop.latitude, longitude: stop.longitude}}
                        title={`Stop ${index + 1}`}
                    />
                ))}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="You are here"
                        anchor={{ x: 0.5, y: 0.5 }}
                        rotation={heading}
                        flat={true}
                    >
                        <Image
                            source={arrow} // path to your custom arrow image
                            style={{ width: 35, height: 35 }}
                            resizeMode="contain"
                        />
                    </Marker>
                )}
            </MapView>
            <BottomDrawer>
                <View></View>
            </BottomDrawer>
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
