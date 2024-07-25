import React, { createContext, useState, useCallback, useContext } from 'react';
import useRouteLogic from '../utils/useRouteLogic/useRouteLogic';
import { RouteContext, useRouteContext } from '../context/RouteContext';
import { useBottomDrawer } from './BottomDrawerContext';
import { disableNetwork } from 'firebase/firestore';

// Create a context
const NavigationContext = createContext();

// Create a provider component
export const NavigationProvider = ({ children }) => {

    const [userLocation, setUserLocation] = useState(null);
    const { routeDetails } = useContext(RouteContext);
    const { fetchAndSetNextStop, setNextStopIndex, nextStopIndex, nextStepIndex, setNextStepIndex } = useRouteLogic();
    const { sortedStops } = useRouteContext();
    const { setCurrentInstruction, setNextStopName, setOtherInstruction } = useBottomDrawer();

    const updateRoute = useCallback(async () => {
        if (userLocation) {
            await fetchAndSetNextStop(userLocation);
            updateInstruction(userLocation);
        }
    }, 
    [userLocation, 
    fetchAndSetNextStop, 
    updateInstruction,
    ]);

    const updateInstruction = (userLocation) => {
        const earthRadius = 6371;
        const nextStepStartCoords = routeDetails.stopsStepsCoords[nextStopIndex - 1][nextStepIndex];
        const dLat = toRadians(userLocation.latitude - nextStepStartCoords.lat);
        const dLon = toRadians(userLocation.longitude - nextStepStartCoords.lng);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRadians(nextStepStartCoords.lat)) * Math.cos(toRadians(userLocation.latitude)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = earthRadius * c;

        if (distance < 0.05) {
            setCurrentInstruction(routeDetails.details[nextStopIndex - 1].steps[nextStepIndex].instructions);
            let otherInstruction = " ";
            if (sortedStops.length > 1) {
                for (var i = 1; i < routeDetails.details[nextStopIndex - 1].steps.length - nextStepIndex; i++)  {
                    otherInstruction += routeDetails.details[nextStopIndex - 1].steps[nextStepIndex + 1].instructions + '\n' + '\n'; 
                }
                setOtherInstruction(otherInstruction);
            }

            setNextStepIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                if (newIndex < routeDetails.details[nextStopIndex - 1].steps.length) {
                    return newIndex;
                }
                
                return prevIndex;
            })
        } else {
            console.log('isNearEnough is not triggering or false');
        }
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    const handleReachDestination = useCallback((notNewTrip) => {
        if (notNewTrip) {
            setNextStopIndex((prevIndex) => {
                setNextStepIndex((prevIndex) => {return 1});
                const newIndex = prevIndex + 1;
                const antarticaCoordinates = {latitude: 82.8628, longitude: 135.0000};
                if (newIndex < sortedStops.length) {
                    updateRoute();
                    
                    setCurrentInstruction(routeDetails.details[prevIndex].steps[0].instructions);
                    let otherInstruction = " ";
                    if (sortedStops.length > 1) {
                        for (var i = 1; i < routeDetails.details[prevIndex].steps.length; i++)  {
                            otherInstruction += routeDetails.details[prevIndex].steps[i].instructions + '\n' + '\n'; 
                        }
                        setOtherInstruction(otherInstruction);
                    }
                    setNextStopName(sortedStops[newIndex].label);

                    return newIndex;
                }
                // Handle end of route
                setCurrentInstruction("You have reached your final destination!");
                setOtherInstruction(" ");
                setNextStopName('');
                return prevIndex;
            });
        } else {
            setNextStopIndex(1);
            setCurrentInstruction('No Instructions Yet!');
            setOtherInstruction(" ");
            setNextStopName('');
        }

    }, [setNextStopIndex, sortedStops, updateRoute, setCurrentInstruction, setOtherInstruction, setNextStopName, nextStopIndex, nextStepIndex, setNextStepIndex, updateInstruction]);

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
