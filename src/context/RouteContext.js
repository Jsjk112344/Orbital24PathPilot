import React, { createContext, useState } from 'react';

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
    tripDate: new Date(), // Default to current date
    tripTime: new Date()  // Default to current time (can separate time if needed)
};

// Initial context with all states and their setters
const initialContext = {
    routeDetails: initialRouteDetails,
    setRouteDetails: () => {},
    currentLocation: null,
    setCurrentLocation: () => {},
    tripInfo: initialTripInfo,
    setTripInfo: () => {}
};

export const RouteContext = createContext(initialContext);

export const RouteProvider = ({ children }) => {
    const [routeDetails, setRouteDetails] = useState(initialRouteDetails);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [tripInfo, setTripInfo] = useState(initialTripInfo);
    const saveTrip = (tripDetails) => {
        setRouteDetails(prevDetails => ({
            ...prevDetails,
            savedTrips: [...prevDetails.savedTrips, tripDetails]
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
            saveTrip
        }}>
            {children}
        </RouteContext.Provider>
    );
};
