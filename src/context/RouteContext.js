import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

// Define the initial state for route details
const initialRouteDetails = {
    coordinates: [],
    distance: '',
    duration: '',
    savedTrips: [],
};

// Define the initial state for trip information
const initialTripInfo = {
    tripName: '',
    tripDate: new Date(), // Default to the current date
    tripTime: new Date()  // Default to the current time (can separate time if needed)
};

// Initial context with all states and their setters
const initialContext = {
    routeDetails: initialRouteDetails,
    setRouteDetails: () => {},
    currentLocation: null,
    setCurrentLocation: () => {},
    tripInfo: initialTripInfo,
    setTripInfo: () => {},
    userId: null,
    setUserId: () => {},
};

export const RouteContext = createContext(initialContext);

export const RouteProvider = ({ children }) => {
    const [routeDetails, setRouteDetails] = useState(initialRouteDetails);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [tripInfo, setTripInfo] = useState(initialTripInfo);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const saveTrip = (tripDetails) => {
        setRouteDetails((prevDetails) => ({
            ...prevDetails,
            savedTrips: [...prevDetails.savedTrips, tripDetails],
        }));
    };

    return (
        <RouteContext.Provider value={{
            routeDetails,
            setRouteDetails,
            currentLocation,
            setCurrentLocation,
            tripInfo,
            setTripInfo,
            userId,
            setUserId,
            saveTrip,
        }}>
            {children}
        </RouteContext.Provider>
    );
};
