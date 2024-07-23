import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

const useLocationTracking = (setUserLocation, setCurrentLocation) => {
    useEffect(() => {
        let watchId;

        const watchCurrentLocation = () => {
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

        watchCurrentLocation();

        return () => {
            if (watchId !== null) {
                Geolocation.clearWatch(watchId);
            }
        };
    }, [setUserLocation, setCurrentLocation]);
};

export default useLocationTracking;
