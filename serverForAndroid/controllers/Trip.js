import { MongoClient } from 'mongodb';

export const createTrip = async (req, res) => {
    const { selectedFlight, selectedReturnedFlight, selectedHotel, selectedRestaurants, selectedAttractions, username, password } = req.body;

    const client = new MongoClient('mongodb://127.0.0.1:27017');

    try {
        console.log('succeded connect to the db');
        // Connect to MongoDB
        await client.connect();
        const db = client.db("travelApp");
        const tripsCollection = db.collection("trips");
        console.log('succeded connect to the db and collection trips');
        // Create a trip object from the request body
        const newTrip = {
            username: username,
            password: password,
            selectedFlight: selectedFlight,
            selectedReturnedFlight: selectedReturnedFlight,
            selectedHotel: selectedHotel,
            selectedRestaurants: selectedRestaurants,
            selectedAttractions: selectedAttractions
        };

        // Insert the trip object into the database
        const result = await tripsCollection.insertOne(newTrip);
        console.log('succeded indert the data');

        // Respond with success message
        res.status(201).json({ message: 'Trip created successfully', tripId: result.insertedId });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).send('An error occurred while creating the trip');
    } finally {
        await client.close();
    }
};
