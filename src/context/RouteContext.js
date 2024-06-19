import React, { createContext, useState } from 'react';

// Expand the context's default state to include currentLocation
export const RouteContext = createContext({
    routeDetails: {
        coordinates: [],
        distance: '',
        duration: '',
    },
    setRouteDetails: () => {},
    currentLocation: null,  // Null initially, will store current location object
    setCurrentLocation: () => {}
});

export const RouteProvider = ({ children }) => {
    const [routeDetails, setRouteDetails] = useState({
        coordinates: [],
        distance: '',
        duration: '',
    });

    // State to hold the current location
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
