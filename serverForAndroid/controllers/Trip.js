import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://baraka5665:tJLuOxgP66gpNrrP@cluster0.mue6k.mongodb.net/travelApp?retryWrites=true&w=majority';

export const getUserTrips = async (req, res) => {
    const { username } = req.query;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("travelApp");
        const tripsCollection = db.collection("trips");

         const trips = await tripsCollection.find({ username }).toArray();

        if (trips.length === 0) {
            return res.status(404).json({ message: "No trips found for this user" });
        }

        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching user trips:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        await client.close();
    }
};
export const createTrip = async (req, res) => {
    const { selectedFlight, selectedReturnedFlight, selectedHotel, selectedRestaurants, selectedAttractions, username, password } = req.body;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        //console.log('succeded connect to the db');
        // Connect to MongoDB
        await client.connect();
        const db = client.db("travelApp");
        const tripsCollection = db.collection("trips");
        //console.log('succeded connect to the db and collection trips');
        // Create a trip object from the request body
        const newTrip = {
            username: username,
            selectedFlight: selectedFlight,
            selectedReturnedFlight: selectedReturnedFlight,
            selectedHotel: selectedHotel,
            selectedRestaurants: selectedRestaurants,
            selectedAttractions: selectedAttractions
        };

        // Insert the trip object into the database
        const result = await tripsCollection.insertOne(newTrip);
        //console.log('succeded indert the data');

        // Respond with success message
        res.status(201).json({ message: 'Trip created successfully', tripId: result.insertedId });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).send('An error occurred while creating the trip');
    } finally {
        await client.close();
    }
};
