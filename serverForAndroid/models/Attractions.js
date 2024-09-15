// models/Restaurants.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://baraka5665:tJLuOxgP66gpNrrP@cluster0.mue6k.mongodb.net/travelApp?retryWrites=true&w=majority';

// Function to connect to the Restaurants collection
export async function getAttractionsCollection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('travelApp');
    return db.collection('attractions');
}
export default {
    getAttractionsCollection
}