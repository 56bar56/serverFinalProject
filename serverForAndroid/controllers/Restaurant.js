import { MongoClient } from 'mongodb';

export const filterRestaurants = async (req, res) => {
    const { location, cuisine, averageCost, rating } = req.body;
    const client = new MongoClient('mongodb://127.0.0.1:27017');

    try {
        await client.connect();
        const db = client.db("travelApp");
        const restaurantsCollection = db.collection("restaurants");

        // Build the query object
        let query = {};

        // Location filter (partial match, case-insensitive)
        if (location !== undefined && location !== "") {
            query.location = { $regex: location, $options: 'i' };  // Partial match, case-insensitive
        }

        // Cuisine filter (partial match, case-insensitive)
        if (cuisine !== undefined && cuisine !== "") {
            query.cuisine = { $regex: cuisine, $options: 'i' };    // Partial match, case-insensitive
        }

        // Average cost filter (less than or equal to the given average cost)
        if (averageCost !== undefined && averageCost !== "") {
            query.averageCost = { $lte: parseInt(averageCost) };
        }

        // Rating filter (greater than or equal to the given rating)
        if (rating !== undefined && rating !== "") {
            query.rating = { $gte: parseFloat(rating) };
        }

        // Log the final query object for debugging
        console.log('Query:', query);

        // Execute the query
        const restaurants = await restaurantsCollection.find(query).toArray();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error filtering restaurants:', error);
        res.status(500).send('An error occurred while filtering restaurants');
    } finally {
        await client.close();
    }
};
