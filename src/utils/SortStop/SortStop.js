import React from "react";
import axios from "axios";

// First stop must be the user's location
async function sortStops(stops) {
  const n = stops.length;
  const distances = await calculateDistances(stops);
  const visited = new Array(n).fill(false);
  const path = [];
  
  let current = 0;
  visited[0] = true;
  path.push(current);

  for (let step = 1; step < n; step++) {
    let nearest = -1;
    let nearestDistance = Infinity;

    for (let i = 1; i < n; i++) {
      if (!visited[i] && distances[current][i] < nearestDistance) {
        nearest = i;
        nearestDistance = distances[current][i];
      }
    }

    if (nearest !== -1) {
      visited[nearest] = true;
      path.push(nearest);
      current = nearest;
    }
  }

  const sortedStops = path.map(index => stops[index]);
  console.info(sortedStops);
  return sortedStops;
}

// Calculate the distances between all stops
async function calculateDistances(stops) {
  const n = stops.length;
  const distances = Array.from({ length: n }, () => Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        distances[i][j] = await timeTaken(stops[i], stops[j]);
      } else {
        distances[i][j] = 0;
      }
    }
  }

  return distances;
}

// Take in coords of 2 points and return time taken (in seconds) from A to B
async function timeTaken(stopA, stopB) {
  try {
    const apiKey = "AIzaSyDDiOFzvaeBEkHd8BQFIG29jNXDI-GAx_0";
    const mode = 'transit';
    const stopAString = `${stopA.latitude},${stopA.longitude}`;
    const stopBString = `${stopB.latitude},${stopB.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${stopAString}&destination=${stopBString}&mode=${mode}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.routes.length > 0 && response.data.routes[0].legs.length > 0) {
      const time = response.data.routes[0].legs[0].duration.value;
      return time;
    } else {
      console.error("No routes found in the response", response.data);
      return Infinity; // Return a large value if no route is found
    }
  } catch (error) {
    console.error("Error in timeTaken:", error);
    return Infinity; // Return a large value in case of error
  }
}

export { timeTaken, sortStops };
