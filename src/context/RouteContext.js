import React, { createContext, useState } from 'react';

// Define the initial state and types of context for better management and predictability
const initialRouteDetails = {
    coordinates: [],
    distance: '',
    duration: '',
};

const initialContext = {
    routeDetails: initialRouteDetails,
    setRouteDetails: () => {},
    currentLocation: null,
    setCurrentLocation: () => {}
};

export const RouteContext = createContext(initialContext);

export const RouteProvider = ({ children }) => {
    const [routeDetails, setRouteDetails] = useState(initialRouteDetails);
    const [currentLocation, setCurrentLocation] = useState(null);

    return (
        <RouteContext.Provider value={{
            routeDetails, 
            setRouteDetails,
            currentLocation,
            setCurrentLocation
        }}>
            {children}
        </RouteContext.Provider>
    );
};
