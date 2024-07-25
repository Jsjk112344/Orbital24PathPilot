import { useState, useContext, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouteContext, RouteContext } from '../../context/RouteContext';
import { fetchRoutes, decodePolylines, parseRouteResponses, fetchLtaBusStops, fetchLtaBusRoutes } from '../apiUtils/apiUtils';
import { sortStops } from '../SortStop/SortStop';
import { useBottomDrawer } from '../../context/BottomDrawerContext';

const useRouteLogic = () => {
    const { routeDetails, setRouteDetails, currentLocation } = useContext(RouteContext);
    const { sortedStops, setSortedStops } = useRouteContext();
    const [stops, setStops] = useState([]);
    const [region, setRegion] = useState({
        latitude: 1.3521,  // Default to Singapore
        longitude: 103.8198,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    //when press reach destination button, increase nextStopIndex by 1 (TBC)
    const [nextStopIndex, setNextStopIndex] = useState(1);
    //The idea is that we will create an array of latlongs coords of the start of each step
    //A >> B >> C >> D == A >> B is Step Index 1, Total is 3 steps.
    const [nextStepIndex, setNextStepIndex] = useState(1);
    const { setCurrentInstruction, nextStopName, setNextStopName, setOtherInstruction } = useBottomDrawer();

    const fetchAndSetRoute = async () => {
        if (stops.length < 2) {
            Alert.alert("Error", "At least two locations are required to calculate a route!");
            return;
        }
        try {
            const sorted = await sortStops(stops); // Ensure this function is correctly defined/imported
            setSortedStops(sorted);

            const [busStops, busRoutes] = await Promise.all([fetchLtaBusStops(), fetchLtaBusRoutes()]);
            const responses = await fetchRoutes(sorted, 'transit');
            const allTransitDetails = parseRouteResponses(responses, busStops, busRoutes);
            const polylineCoordinates = decodePolylines(responses);
            
            let stopsStepsCoords = [];

            for (var i = 0; i < stops.length - 1; i++) {
                stopsStepsCoords[i] = new Array();
                for (var j = 0; j < allTransitDetails[i].steps.length; j++) {
                    stopsStepsCoords[i].push(allTransitDetails[i].steps[j].start_location);
                }
            }

            setRouteDetails(prevState => ({
                ...prevState,
                details: allTransitDetails,
                coordinates: polylineCoordinates,
                stopsStepsCoords: stopsStepsCoords,
            }));

            setCurrentInstruction(allTransitDetails[0].steps[0].instructions);
            let otherInstruction = " ";
            if (sorted.length > 1) {
                for (var i = 1; i < allTransitDetails[0].steps.length; i++)  {
                    otherInstruction += allTransitDetails[0].steps[i].instructions + '\n' + '\n'; 
                }
                setOtherInstruction(otherInstruction);
            }
            setNextStopName(sorted[nextStopIndex].label);
            
            // Optionally update the region here if needed
            return { success: true };
        } catch (error) {
            console.error("fetchAndSetRoute() in useRouteLogic.js: Error fetching and setting route:", error);
            Alert.alert("Error", "Failed to process the route data.");
            return { success: false, message: error.message };
        }
    };

    const fetchAndSetNextStop = useCallback(async (currentLocation) => {
        if (!currentLocation || sortedStops.length < 1) {
            //console.log("fetchAndSetNextStop triggered, no update to route, sortedStops length: " + sortedStops.length);
            return;
        }
        try {
            const [busStops, busRoutes] = await Promise.all([fetchLtaBusStops(), fetchLtaBusRoutes()]);
            const response = await fetchRoutes([currentLocation, sortedStops[nextStopIndex]], 'transit');
            const allTransitDetails = parseRouteResponses(response, busStops, busRoutes);
            const polylineCoordinates = decodePolylines(response);

            setRouteDetails(prevState => ({
                ...prevState,
                nextStopCoords: polylineCoordinates,
                nextStopDetails: allTransitDetails,
            }));

            return { success: true };
        } catch (error) {
            console.error("fetchAndSetNextStop() in useRouteLogic.js: Error fetching and setting route:", error);
            Alert.alert("Error", "Failed to process the route data.");
            return { success: false, message: error.message };
        }
    }, [sortedStops, nextStopIndex, setCurrentInstruction, setNextStopName]);

    return { 
        stops, 
        setStops, 
        fetchAndSetRoute, 
        region, 
        setRegion, 
        setNextStopIndex, 
        setOtherInstruction, 
        fetchAndSetNextStop, 
        nextStopIndex, 
        nextStepIndex,
        setNextStepIndex,
    };
};

export default useRouteLogic;