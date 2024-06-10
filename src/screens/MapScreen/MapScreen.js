import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { RouteContext } from '../../context/RouteContext'; // Ensure this path matches your context location

const MapScreen = () => {
    const { routeDetails } = useContext(RouteContext);
    const { coordinates } = routeDetails;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 1.3521,  // Center on Singapore
                    longitude: 103.8198,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {coordinates.length > 0 && (
                    <Polyline
                        coordinates={coordinates}
                        strokeWidth={5}
                        strokeColor="red" // You can customize the color
                    />
                )}
                {coordinates.length > 0 && (
                    <>
                        <Marker coordinate={coordinates[0]} title="Start" />
                        <Marker coordinate={coordinates[coordinates.length - 1]} title="End" />
                    </>
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
