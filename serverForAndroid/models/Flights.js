// models/Flight.js
import { MongoClient } from 'mongodb';

// Function to connect to the flights collection
export async function getFlightsCollection() {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('travelApp');
    return db.collection('flights');
}
export default {
    getFlightsCollection
}