import React, { createContext, useState, useCallback, useContext } from 'react';
import useRouteLogic from '../utils/useRouteLogic/useRouteLogic';
import { useRouteContext } from '../context/RouteContext';
import { useBottomDrawer } from './BottomDrawerContext';

// Create a context
const NavigationContext = createContext();

// Create a provider component
export const NavigationProvider = ({ children }) => {

    //stuff added myself
    const [userLocation, setUserLocation] = useState(null);

    const { fetchAndSetNextStop, setNextStopIndex, nextStopIndex } = useRouteLogic();
    const { sortedStops } = useRouteContext();
    const { setCurrentInstruction, setNextStopName } = useBottomDrawer();

    const updateRoute = useCallback(async () => {
        if (userLocation) {
            await fetchAndSetNextStop(userLocation);
        }
    }, [userLocation, fetchAndSetNextStop]);

    const handleReachDestination = useCallback((notNewTrip) => {
        if (notNewTrip) {
            console.log('triggering handleReachDestination in NavigationProviderContext, sortedStops: ', sortedStops);
            setNextStopIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                if (newIndex < sortedStops.length) {
                    updateRoute();
                    return newIndex;
                }
                // Handle end of route
                setCurrentInstruction("You have reached your final destination!");
                setNextStopName('');
                return prevIndex;
            });
        } else {
            setNextStopIndex(1);
            setCurrentInstruction('No Instructions Yet!');
            setNextStopName('');
        }

        console.log("handleReachDestination in NavigationProviderContext triggered, nextStopIndex: ", nextStopIndex);
    }, [setNextStopIndex, sortedStops, updateRoute, setCurrentInstruction, setNextStopName, nextStopIndex]);

    return (
        <NavigationContext.Provider value={{
            handleReachDestination,
            updateRoute,
            userLocation,
            setUserLocation,
        }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Custom hook to use the NavigationContext
export const useNavigationContext = () => {
    return useContext(NavigationContext);
};
