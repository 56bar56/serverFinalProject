// models/Hotels.js
import { MongoClient } from 'mongodb';

// Function to connect to the hotels collection
export async function getHotelsCollection() {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('travelApp');
    return db.collection('hotels');
}
export default {
    getHotelsCollection
}