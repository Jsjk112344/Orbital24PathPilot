import { useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

const useLocationPermission = () => {
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
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert("Permission Denied", "Location permission is required for this app to function properly.");
                }
            }
        };

        requestLocationPermission();
    }, []);
};

export default useLocationPermission;
