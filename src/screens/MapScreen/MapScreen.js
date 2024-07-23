import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Image } from 'react-native-elements';
import arrow from '../../../assets/images/location_arrow.png';
import { RouteContext } from '../../context/RouteContext';
import { useRouteContext } from '../../context/RouteContext'; 
import useLocationPermission from '../../utils/LocationTrackingServices/useLocationPermission/useLocationPermission';
import useLocationTracking from '../../utils/LocationTrackingServices/useLocationTracking/useLocationTracking';
import useHeadingTracking from '../../utils/LocationTrackingServices/useHeadingTracking/useHeadingTracking';
import BottomDrawer from '../../components/BottomDrawer/BottomDrawer';
import { useBottomDrawer } from '../../context/BottomDrawerContext';
import { useNavigationContext } from '../../context/NavigationProviderContext';

//HI HI This is to test if you can see this branch

const MapScreen = () => {
    const { sortedStops } = useRouteContext();
    const { routeDetails, setCurrentLocation } = useContext(RouteContext);
    const { userLocation, setUserLocation, updateRoute, handleReachDestination } = useNavigationContext();
    const [heading, setHeading] = useState(0);

    useLocationPermission();
    useLocationTracking(setUserLocation, setCurrentLocation);
    useHeadingTracking(setHeading);

    useEffect(() => {
        updateRoute();
    }, [updateRoute]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={userLocation}
            >
                {routeDetails.nextStopCoords && (
                    <Polyline
                        coordinates={routeDetails.nextStopCoords}
                        strokeWidth={5}
                        strokeColor='red'
                    />
                )}
                {routeDetails.coordinates.length > 0 && (
                    <Polyline
                        coordinates={routeDetails.coordinates}
                        strokeWidth={5}
                        strokeColor="red"
                        lineDashPattern={[20, 20]}
                    />
                )}
                {sortedStops.map((stop, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
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
                            source={arrow}
                            style={{ width: 35, height: 35 }}
                            resizeMode="contain"
                        />
                    </Marker>
                )}
            </MapView>
            <BottomDrawer onReachDestination={handleReachDestination}>
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
