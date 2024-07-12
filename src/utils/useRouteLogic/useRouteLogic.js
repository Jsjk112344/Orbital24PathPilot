import { useState, useContext, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRouteContext, RouteContext } from '../../context/RouteContext';
import { fetchRoutes, decodePolylines, parseRouteResponses } from '../apiUtils/apiUtils'
import { sortStops } from '../SortStop/SortStop'

const useRouteLogic = () => {
    const { setRouteDetails, currentLocation } = useContext(RouteContext);
    const { sortedStops, setSortedStops } = useRouteContext();
    const [stops, setStops] = useState([]);
    const [region, setRegion] = useState({
        latitude: 1.3521,  // Default to Singapore
        longitude: 103.8198,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    //when press reach destination button, increase nextStopIndex by 1 (TBC)
    const [nextStopIndex, updateNextStopIndex] = useState(1);

    const fetchAndSetRoute = async () => {
        console.log("fetchAndSetRoute triggered, stops length: " + stops.length);
        if (stops.length < 2) {
            Alert.alert("Error", "At least two locations are required to calculate a route!");
            return;
        }
        try {
            console.log("STOPS", stops);
            const sorted = await sortStops(stops); // Ensure this function is correctly defined/imported
            console.log("SORTED STOPS", sorted);
            setSortedStops(sorted);

            const responses = await fetchRoutes(sorted, 'transit');
            const allTransitDetails = parseRouteResponses(responses);
            const polylineCoordinates = decodePolylines(responses);

            // const firstLegResponse = await fetchRoutes([sorted[0], sorted[1]], 'transit');
            // const firstLegTransit = decodePolylines(firstLegResponse);

            setRouteDetails(prevState => ({
                ...prevState,
                details: allTransitDetails,
                coordinates: polylineCoordinates,
                //firstLegCoords: firstLegTransit,
            }));

            // Optionally update the region here if needed
            return { success: true };
        } catch (error) {
            console.error("Error fetching and setting route:", error);
            Alert.alert("Error", "Failed to process the route data.");
            return { success: false, message: error.message };
        }
    };

    const fetchAndSetNextStop = useCallback(async(currentLocation) => {
        if (!currentLocation || sortedStops.length < 1) {
            //Alert.alert("Error", "Current location and at least one destination are required!");
            console.log("fetchAndSetNextStop triggered, no update to route, sortedStops length: " + sortedStops.length);
            return;
        }
        try {
            const response = await fetchRoutes([currentLocation, sortedStops[nextStopIndex]], 'transit');
            const allTransitDetails = parseRouteResponses(response);
            const polylineCoordinates = decodePolylines(response);

            setRouteDetails(prevState => ({
                ...prevState,
                nextStopCoords:polylineCoordinates,
                //if this works, add first leg details here
            }));

            return { success: true };
        } catch (error) {
            console.error("Error fetching and setting route:", error);
            Alert.alert("Error", "Failed to process the route data.");
            return { success: false, message: error.message };
        }
    }, [sortedStops, nextStopIndex]);

    return { stops, setStops, fetchAndSetRoute, region, setRegion, updateNextStopIndex, fetchAndSetNextStop };
};

export default useRouteLogic;