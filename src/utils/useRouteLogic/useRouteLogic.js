import { useState, useContext } from 'react';
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

    const fetchAndSetRoute = async () => {
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

    return { stops, setStops, fetchAndSetRoute, region, setRegion };
};

export default useRouteLogic;