import { saveTripDetails } from '../../utils/SQLite/SQLite'

jest.mock('../utils/SQLite/SQLite', () => ({
  saveTripDetails: jest.fn(),
}));

test('should save trip details correctly', async () => {
  const tripDetails = {
    user_id: 'test-user',
    name: 'Test Trip',
    date: new Date().toISOString(),
    details: JSON.stringify([]),
    polyline: JSON.stringify([{ latitude: 1.3521, longitude: 103.8198 }]),
  };

  await saveTripDetails(tripDetails.user_id, tripDetails.name, tripDetails.date, tripDetails.details, tripDetails.polyline);
  expect(saveTripDetails).toHaveBeenCalledWith(tripDetails.user_id, tripDetails.name, tripDetails.date, tripDetails.details, tripDetails.polyline);
});
