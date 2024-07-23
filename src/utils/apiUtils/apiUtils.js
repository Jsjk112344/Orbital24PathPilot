import axios from 'axios';
import polyline from '@mapbox/polyline';

const fetchLtaBusStops = async () => {
    const myHeaders = new Headers();
    myHeaders.append("AccountKey", "dvnEMazuR2ahYmibY19thg==");
    myHeaders.append("accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("http://datamall2.mytransport.sg/ltaodataservice/BusStops", requestOptions);
        const result = await response.json();
        return result.value || [];
    } catch (error) {
        console.error("Error fetching LTA bus stops:", error);
        return [];
    }
};

const fetchLtaBusRoutes = async () => {
    const myHeaders = new Headers();
    myHeaders.append("AccountKey", "dvnEMazuR2ahYmibY19thg==");
    myHeaders.append("accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("http://datamall2.mytransport.sg/ltaodataservice/BusRoutes", requestOptions);
        const result = await response.json();
        return result.value || [];
    } catch (error) {
        console.error("Error fetching LTA bus routes:", error);
        return [];
    }
};

const getBusSuggestions = (startLocation, endLocation, busStops, busRoutes) => {
    const startBusStop = busStops.find(stop => {
        return Math.abs(stop.Latitude - startLocation.lat) < 0.001 && Math.abs(stop.Longitude - startLocation.lng) < 0.001;
    });

    const endBusStop = busStops.find(stop => {
        return Math.abs(stop.Latitude - endLocation.lat) < 0.001 && Math.abs(stop.Longitude - endLocation.lng) < 0.001;
    });

    if (startBusStop && endBusStop) {
        const possibleRoutes = busRoutes.filter(route => 
            route.OriginCode === startBusStop.BusStopCode && route.DestinationCode === endBusStop.BusStopCode
        );

        if (possibleRoutes.length > 0) {
            const suggestions = possibleRoutes.map(route => ({
                bus: route.ServiceNo,
                from: startBusStop.Description,
                to: endBusStop.Description
            }));
            return { suggested_buses: suggestions };
        }
    }
    return null;
};

const fetchRoutes = async (sortedStops, mode) => {
    const requests = sortedStops.map((stop, index, array) => {
        if (index < array.length - 1) {
            const origin = stop;
            const destination = array[index + 1];
            const originStr = `${origin.latitude},${origin.longitude}`;
            const destinationStr = `${destination.latitude},${destination.longitude}`;
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&mode=${mode}&key=AIzaSyC5_cY4UTzj7QTkIG3PT8trIrvfvEMF1YQ`;
            return axios.get(url);
        }
        return null;
    }).filter(Boolean);
    
    return Promise.all(requests);
};

const parseRouteResponses = (responses, busStops, busRoutes) => {
    return responses.map(response => {
        if (response.data.status === 'OK' && response.data.routes.length > 0) {
            const routeResponse = response.data.routes[0];
            return routeResponse.legs.map(leg => ({
                distance: leg.distance.text,
                duration: leg.duration.text,
                steps: leg.steps.map(step => ({
                    travel_mode: step.travel_mode,
                    instructions: step.html_instructions.replace(/<[^>]+>/g, ''), // Clean HTML tags
                    distance: step.distance.text,
                    duration: step.duration.text,
                    start_location: step.start_location,
                    end_location: step.end_location,
                    polyline: step.polyline.points,
                    transit_details: step.transit_details ? {
                        departure_stop: step.transit_details.departure_stop.name,
                        arrival_stop: step.transit_details.arrival_stop.name,
                        line: step.transit_details.line.short_name,
                        vehicle: step.transit_details.line.vehicle.type,
                        num_stops: step.transit_details.num_stops
                    } : getBusSuggestions(step.start_location, step.end_location, busStops, busRoutes)
                }))
            }));
        }
        return [];
    }).flat(); // Flattening the array if necessary based on your response structure
};

const decodePolylines = (responses) => {
    let coordinates = [];
    responses.forEach(response => {
        if (response.data.status === 'OK' && response.data.routes.length > 0) {
            const routeResponse = response.data.routes[0];
            const decodedPolyline = polyline.decode(routeResponse.overview_polyline.points);
            const polylineCoordinates = decodedPolyline.map(point => ({
                latitude: point[0],
                longitude: point[1]
            }));
            coordinates.push(...polylineCoordinates);
        }
    });
    return coordinates;
};

export { fetchRoutes, decodePolylines, parseRouteResponses, fetchLtaBusStops, fetchLtaBusRoutes };
