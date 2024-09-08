// models/Restaurants.js
import { MongoClient } from 'mongodb';

// Function to connect to the Restaurants collection
export async function getRestaurantsCollection() {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('travelApp');
    return db.collection('restaurants');
}
export default {
    getRestaurantsCollection
}