import { MongoClient } from 'mongodb';

export const filterHotels = async (req, res) => {
    const { pricePerNight, location, rating, distanceFromCenterKm, type } = req.body;

    const client = new MongoClient('mongodb://127.0.0.1:27017');

    try {
        await client.connect();
        const db = client.db("travelApp");
        const hotelsCollection = db.collection("hotels");

        // Build the query object
        let query = {};

        // Max price filter (convert to number)
        if (pricePerNight !== undefined && pricePerNight !== "") {
            query.pricePerNight = { $lte: parseFloat(pricePerNight) };
        }

        // Location filter using regex (case-insensitive)
        if (location !== undefined && location !== "") {
            query.location = { $regex: new RegExp(location, 'i') };
        }

        // Rating filter
        if (rating !== undefined && rating !== "") {
            query.rating = { $gte: parseFloat(rating) };
        }

        // Distance from city filter (convert to number)
        if (distanceFromCenterKm !== undefined && distanceFromCenterKm !== "") {
            query.distanceFromCenterKm = { $lte: parseFloat(distanceFromCenterKm) };
        }

        // Type filter (hotel or cabin)
        if (type !== undefined && type !== "") {
            query.type = type;
        }

        // Print the query for debugging
        //console.log('Query:', query);

        // Execute the query and return the results
        const hotels = await hotelsCollection.find(query).toArray();
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Error filtering hotels:', error);
        res.status(500).send('An error occurred while filtering hotels');
    } finally {
        await client.close();
    }
};
