import { useState, useContext, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouteContext, RouteContext } from '../../context/RouteContext';
import { fetchRoutes, decodePolylines, parseRouteResponses } from '../apiUtils/apiUtils'
import { sortStops } from '../SortStop/SortStop'
import { useBottomDrawer } from '../../context/BottomDrawerContext';
import BottomDrawer from '../../components/BottomDrawer/BottomDrawer';
import { useNavigationContext } from '../../context/NavigationProviderContext';

const useRouteLogic = () => {
    const { routeDetails, setRouteDetails, currentLocation } = useContext(RouteContext);
    //const { handleReachDestination } = useNavigationContext();
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
    const { setCurrentInstruction, nextStopName, setNextStopName } = useBottomDrawer();

    const fetchAndSetRoute = async () => {
        console.log("fetchAndSetRoute triggered, stops length: " + stops.length);
        //handleReachDestination(false);
        // setNextStopIndex(1);
        //fetchAndSetNextStop(currentLocation);
        console.log('fetchAndSetRoute setNextStopIndex to: ', nextStopIndex);
        
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

            setRouteDetails(prevState => ({
                ...prevState,
                details: allTransitDetails,
                coordinates: polylineCoordinates,
            }));
            
            // Optionally update the region here if needed
            return { success: true };
        } catch (error) {
            console.error("Error fetching and setting route:", error);
            Alert.alert("Error", "Failed to process the route data.");
            return { success: false, message: error.message };
        }
    };

    const fetchAndSetNextStop = useCallback(async (currentLocation) => {
        if (!currentLocation || sortedStops.length < 1) {
            console.log("fetchAndSetNextStop triggered, no update to route, sortedStops length: " + sortedStops.length);
            return;
        }
        try {
            console.log("fetchAndSetNextStop triggered, nextStopIndex: ", nextStopIndex);
            const response = await fetchRoutes([currentLocation, sortedStops[nextStopIndex]], 'transit');
            const allTransitDetails = parseRouteResponses(response);
            const polylineCoordinates = decodePolylines(response);

            setRouteDetails(prevState => ({
                ...prevState,
                nextStopCoords: polylineCoordinates,
                //if this works, add first leg details here
                nextStopDetails: allTransitDetails,
            }));

            setCurrentInstruction(allTransitDetails[0].steps[0].instructions);
            console.log('sortedStops: ', sortedStops);
            console.info('nextStopDetails: ', allTransitDetails[0]);
            setNextStopName(sortedStops[nextStopIndex].label);
            console.log("Updated Current Instruction");

            return { success: true };
        } catch (error) {
            console.error("Error fetching and setting route:", error);
            Alert.alert("Error", "Failed to process the route data.");
            return { success: false, message: error.message };
        }
    }, [sortedStops, nextStopIndex, setCurrentInstruction, setNextStopName,]);

    return { stops, setStops, fetchAndSetRoute, region, setRegion, setNextStopIndex, fetchAndSetNextStop, nextStopIndex };
};

export default useRouteLogic;