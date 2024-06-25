import React from "react";
import axios from "axios";
//First stop must be the user's location
async function sortStops(stops) {
    //Initialise
    const n = stops.length;
    console.log(stops);
    const visited = new Array(n).fill(false);
    const dist = new Array(n).fill(Infinity);
    const prev = new Array(n).fill(null);
    const pq = new PriorityQueue();
    //Djikstra's
    dist[0] = 0;
    pq.enqueue(0, 0);
    const newStops = new Array();
    while (!pq.isEmpty()) {
    const u = pq.dequeue();
    if (!visited[u]) {
        newStops.push(u);
    }
    visited[u] = true;
        for (let v = 0; v < n; v++) {
            if (u !== v && !visited[v]) {
             
            const distance = await timeTaken(stops[u], stops[v]);
            console.log(distance)
                if (dist[u] + distance < dist[v]) {
                    dist[v] = dist[u] + distance;
                    prev[v] = u;
                    pq.enqueue(v, dist[v]);
                }
            }
        }
    }
    //Debug console.info
    console.log(newStops)
    newStops.map(index => stops[index]);
    for (let i = 0; i < n; i++) {
        newStops[i] = stops[newStops[i]];
    }
    console.info(newStops);
  
    return newStops;
}

//Take in coords of 2 points and return time taken (in seconds) from A to B
async function timeTaken(stopA, stopB) {
    try {
        const apiKey = "AIzaSyC5_cY4UTzj7QTkIG3PT8trIrvfvEMF1YQ";
        const mode = 'transit';
        const stopAString = `${stopA.latitude},${stopA.longitude}`;
        const stopBString = `${stopB.latitude},${stopB.longitude}`;
        console.log(stopAString);
        console.log(stopBString);

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${stopAString}&destination=${stopBString}&mode=${mode}&key=${apiKey}`;
        const urlResponse = await axios.get(url);
        const time = urlResponse.data.routes[0].legs[0].duration.value
  
        //console.log(time);
        return time;
    } catch (error) {
        console.log(error);
    }
}
//PQ class for Djikstra's Algo
class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element, priority) {
      this.queue.push({ element, priority });
      this.sort();
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue.shift().element;
    }
  
    sort() {
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
}
export {timeTaken, sortStops};