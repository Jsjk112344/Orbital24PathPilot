import React, { createContext, useState } from 'react';

// Create the context with an initial default state
export const RouteContext = createContext({
    routeDetails: {
        coordinates: [],
        distance: '',
        duration: '',
    },
    setRouteDetails: () => {}
});

// This component will provide the context to other parts of the app
export const RouteProvider = ({ children }) => {
    const [routeDetails, setRouteDetails] = useState({
        coordinates: [],
        distance: '',
        duration: '',
    });

    return (
        <RouteContext.Provider value={{ routeDetails, setRouteDetails }}>
            {children}
        </RouteContext.Provider>
    );
};
