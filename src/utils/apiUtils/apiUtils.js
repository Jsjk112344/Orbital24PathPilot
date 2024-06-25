import axios from 'axios';
import polyline from '@mapbox/polyline';

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

const parseRouteResponses = (responses) => {
    return responses.map(response => {
        if (response.data.status === 'OK' && response.data.routes.length > 0) {
            const routeResponse = response.data.routes[0];
            return routeResponse.legs.map(leg => ({
                distance: leg.distance.text,
                duration: leg.duration.text,
                steps: leg.steps.map(step => ({
                    travel_mode: step.travel_mode,
                    instructions: step.html_instructions,
                    transit_details: step.transit_details ? {
                        departure_stop: step.transit_details.departure_stop.name,
                        arrival_stop: step.transit_details.arrival_stop.name,
                        line: step.transit_details.line.short_name,
                        vehicle: step.transit_details.line.vehicle.type
                    } : null
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

export { fetchRoutes, decodePolylines, parseRouteResponses };
