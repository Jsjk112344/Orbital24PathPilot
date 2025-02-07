import axios from 'axios';

const getDirections = async (origin, destination) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?`, {
            params: {
                origin: origin,
                destination: destination,
                mode: 'transit', // set the mode to transit for public transportation
                key: 'AIzaSyDDiOFzvaeBEkHd8BQFIG29jNXDI-GAx_0'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch directions:', error);
        return null;
    }
};
export default getDirections;
