import { MongoClient } from 'mongodb';

export const filterAttractions = async (req, res) => {
    console.log('Filtering request:');

    const { location, attraction, rating, averageCost, kidFriendly } = req.body;
    const client = new MongoClient('mongodb://127.0.0.1:27017');

    try {
        await client.connect();
        const db = client.db("travelApp");
        const attractionsCollection = db.collection("attractions");

        // Build the query object
        let query = {};

        // Location filter (OR between locations)
        if (location && location.length > 0) {
            query.$or = location.map(city => ({
                location: { $regex: `^${city}`, $options: 'i' }  // Regex now has city as a string
            }));
        }

        // Attraction filter (OR between attractions)
        if (attraction && attraction.length > 0) {
            query.attraction = { $in: attraction };  // Matches any attraction in the array
        }

        // Rating filter (greater than or equal to the given rating)
        if (rating !== undefined && rating !== "") {
            query.rating = { $gte: parseFloat(rating) };
        }

        // Average cost filter (less than or equal to the given average cost)
        if (averageCost !== undefined && averageCost !== "") {
            query.averageCost = { $lte: parseFloat(averageCost) };
        }

        // Kid-friendly filter (must match exactly "yes")
        if (kidFriendly !== undefined && kidFriendly !== "") {
            query.kidFriendly = kidFriendly;  // Matches only if kidFriendly is exactly "yes"
        }

        // Log the final query object for debugging
        //console.log('Query:', JSON.stringify(query, null, 2)); // Pretty print the query

        // Execute the query
        const attractions = await attractionsCollection.find(query).toArray();
        //console.log('Attractions:', attractions);
        res.status(200).json(attractions);
    } catch (error) {
        console.error('Error filtering attractions:', error);
        res.status(500).send('An error occurred while filtering attractions');
    } finally {
        await client.close();
    }
};
